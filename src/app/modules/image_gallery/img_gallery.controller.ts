import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { imgGalleryServices } from './img_gallery.service';


const createImgGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await imgGalleryServices.createImgGallery(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Image gallery create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllImgGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await imgGalleryServices.getAllImgGallery(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ImgGallery are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleImgGallery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await imgGalleryServices.getSinigleImgGallery(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ImgGallery is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteImgGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await imgGalleryServices.deleteImgGallery(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ImgGallery deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateImgGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await imgGalleryServices.updateImgGallery(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ImgGallery update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const imgGalleryControllers = {
  getAllImgGallery,
  getSingleImgGallery,
  deleteImgGallery,
  updateImgGallery,
   createImgGallery,
};
