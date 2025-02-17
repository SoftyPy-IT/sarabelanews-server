/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { UploadApiResponse } from 'cloudinary';
import httpStatus from 'http-status';
import {
  cloudinaryConfig,
  sendImageToCloudinary,
} from '../../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { FolderModel, ImageGalleryModel } from './gallery.model';
import { imageValidator } from './gallery.utils';
import mongoose from 'mongoose';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const compressImage = async (req: Request) => {
  try {


    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) {
      return { success: false, message: 'No files uploaded', data: [] };
    }

    const compressedImagesPath = './compressed_uploads';
    if (!fs.existsSync(compressedImagesPath)) {
      fs.mkdirSync(compressedImagesPath, { recursive: true });
    }

    const compressedImages: { original: string; compressed: string }[] = [];

    for (const file of files) {
      try {
        const filePath = path.resolve(file.path); // Normalize path
        const outputFilePath = path.join(
          compressedImagesPath,
          `compressed_${file.filename}`,
        );



        // Compress using buffer and save manually
        const buffer = await sharp(filePath)
          .resize({ width: 800 })
          .jpeg({ quality: 70 })
          .toBuffer();

        fs.writeFileSync(outputFilePath, buffer);
    

        // Attempt async deletion
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete ${filePath}:`, err);

        });

        compressedImages.push({
          original: file.filename,
          compressed: outputFilePath,
        });
      } catch (fileError) {
        console.error(`Error processing file ${file.filename}:`, fileError);
      }
    }



    return compressedImages 
  } catch (error) {
    console.error('Error compressing images:', error);
    return {
      success: false,
      message: 'Error compressing images',
      error: error,
    };
  }
};

const getAllImages = async (req: Request) => {
  try {
    const query = req.query;
    const galleryQuery = new QueryBuilder(
      ImageGalleryModel.find().populate('folder'),
      query,
    )
      .filter()
      .sort()
      .paginate();

    const meta = await galleryQuery.countTotal();
    const result = await galleryQuery.modelQuery;

    return { result, meta };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getImagesByFolder = async (req: Request) => {
  const { folder } = req.params;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const page = parseInt(req.query.page as string, 10) || 1;

  try {
    const folderExist = await FolderModel.findOne({ _id: folder });
    if (!folderExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
    }

    const totalImages = await ImageGalleryModel.countDocuments({
      folder: folderExist._id,
    });

    const images = await ImageGalleryModel.find({
      folder: folderExist._id,
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      images,
      folder: folderExist.name,
      meta: {
        total: totalImages,
        page,
        limit,
        totalPages: Math.ceil(totalImages / limit),
      },
    };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const createImage = async (req: Request): Promise<string> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Make sure multer stores the files in 'req.files'
    const files = req.files as Express.Multer.File[];

    const { folder } = req.body;

    if (!files || files.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Please upload images');
    }

    if (!folder) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Please provide a folder name',
      );
    }

    const folderDoc = await FolderModel.findOne({ _id: folder }).session(
      session,
    );
    if (!folderDoc) {
      throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
    }

    const uploadedImages: any[] = [];

    // Loop through uploaded files
    for (const file of files) {
      const validationError = imageValidator(file.size, file.mimetype);
      if (validationError) {
        throw new AppError(httpStatus.BAD_REQUEST, validationError);
      }

      // Create image name and upload to Cloudinary
      const fileNameWithoutExtension = file.originalname
        .split('.')
        .slice(0, -1)
        .join('.');
      const imageName = `news/${Date.now()}-${fileNameWithoutExtension}`;
      const path = file.path;

      const { secure_url, public_id } = (await sendImageToCloudinary(
        imageName,
        path,
        folder,
      )) as UploadApiResponse;

      uploadedImages.push({
        url: secure_url,
        public_id,
        folder: folderDoc._id,
      });
    }

    if (uploadedImages.length > 0) {
      const insertedImages = await ImageGalleryModel.insertMany(
        uploadedImages,
        { session },
      );
      await FolderModel.findByIdAndUpdate(folderDoc._id, {
        $addToSet: {
          images: { $each: insertedImages.map((image) => image._id) },
        },
      }).session(session);
    }

    await session.commitTransaction();
    return 'Images uploaded successfully';
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  } finally {
    session.endSession();
  }
};

export const deleteImage = async (body: { id: string; public_id: string }) => {
  const { id, public_id } = body;
  const image = await ImageGalleryModel.findById(id);
  if (!image) {
    throw new AppError(httpStatus.NOT_FOUND, 'Image not found');
  }

  await cloudinaryConfig.uploader.destroy(public_id);
  await ImageGalleryModel.findByIdAndDelete(id);

  return { success: true, message: 'Image deleted successfully' };
};

const getFolders = async (req: Request) => {
  try {
    const searchableFields = ['name'];
    const query = req.query;
    const folderQuery = new QueryBuilder(FolderModel.find(), query)
      .search(searchableFields)
      .filter()
      .sort()
      .paginate();

    const meta = await folderQuery.countTotal();
    const result = await folderQuery.modelQuery;

    return {
      meta,
      result,
    };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

// Function to create a folder
const createFolder = async (req: Request) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Please provide a folder name',
      );
    }

    const folder = await FolderModel.createFolder(name);
    return folder;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

// Function to delete a folder
const deleteFolder = async (req: Request) => {
  try {
    const { id } = req.params;
    // check if folder has images if yes, then show error message else delete folder
    const folder = await FolderModel.findById(id);
    if (!folder) {
      throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
    }

    // if (folder.images.length > 0) {
    //   throw new AppError(
    //     httpStatus.BAD_REQUEST,
    //     'Folder has images. Please delete images first',
    //   );
    // }

    await FolderModel.findByIdAndDelete(id);

    return 'Folder deleted successfully';
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const imageGalleryService = {
  getAllImages,
  getImagesByFolder,
  createImage,
  deleteImage,
  createFolder,
  deleteFolder,
  getFolders,
  compressImage,
};
