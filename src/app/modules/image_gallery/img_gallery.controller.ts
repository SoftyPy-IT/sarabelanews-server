import {  Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { imgGalleryServices } from './img_gallery.service';
import { catchAsync } from '../../../utils/catchAsync';

const createImgGallery = catchAsync(async (req: Request, res: Response) => {
  const result = await imgGalleryServices.createImgGallery(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Image gallery created successfully',
    data: result,
  });
});

const getAllImgGallery = catchAsync(async (req: Request, res: Response) => {
  const result = await imgGalleryServices.getAllImgGallery(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image galleries retrieved successfully',
    data: result,
  });
});

const getSingleImgGallery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await imgGalleryServices.getSingleImgGallery(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image gallery retrieved successfully',
    data: result,
  });
});

const deleteImgGallery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await imgGalleryServices.deleteImgGallery(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image gallery deleted successfully',
    data: result,
  });
});

const updateImgGallery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await imgGalleryServices.updateImgGallery(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image gallery updated successfully',
    data: result,
  });
});

export const imgGalleryControllers = {
  getAllImgGallery,
  getSingleImgGallery,
  deleteImgGallery,
  updateImgGallery,
  createImgGallery,
};

