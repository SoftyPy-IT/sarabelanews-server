import QueryBuilder from '../../builder/QueryBuilder';
import { TImgGallery } from './img_gallery.interface';
import { ImgGallery } from './img_gallery.model';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { imageGallerySearch } from './image_gallery.constan';
import { Category } from '../category/category.model';

const createImgGallery = async (payload: TImgGallery) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if category exists
    const categoryExists = await Category.findById(payload.category).session(
      session,
    );
    if (!categoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    // Create the image gallery document in the session
    const result = await ImgGallery.create([payload], { session });
    await session.commitTransaction();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllImgGallery = async (query: Record<string, unknown>) => {
  const imgGalleryQuery = new QueryBuilder(ImgGallery.find(), query)
    .search(imageGallerySearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await imgGalleryQuery.countTotal();
  const galleries = await imgGalleryQuery.modelQuery;

  return {
    meta,
    galleries,
  };
};

const getSingleImgGallery = async (id: string) => {
  const result = await ImgGallery.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Image gallery not found');
  }
  return result;
};

const updateImgGallery = async (id: string, payload: Partial<TImgGallery>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await ImgGallery.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    });

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Image gallery not found');
    }

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteImgGallery = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await ImgGallery.findByIdAndDelete(id).session(session);
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Image gallery not found');
    }

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const imgGalleryServices = {
  createImgGallery,
  getAllImgGallery,
  getSingleImgGallery,
  updateImgGallery,
  deleteImgGallery,
};
