import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { videoervices } from './video.service';

const createVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await videoervices.createVideo(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await videoervices.getAllVideo(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleVideo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await videoervices.getSinigleVideo(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await videoervices.deleteVideo(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await videoervices.updateVideo(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const videoControllers = {
  getAllVideo,
  getSingleVideo,
  deleteVideo,
  updateVideo,
  createVideo,
};
