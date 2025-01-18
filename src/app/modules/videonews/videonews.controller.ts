import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { videoeNewsServices } from './videonews.service';
import { catchAsync } from '../../../utils/catchAsync';

const createVideoNews = catchAsync(async (req, res, next) => {
  try {
    const result = await videoeNewsServices.createVideoNews(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video news create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const getAllVideoNews = catchAsync(async (req, res, next) => {
  try {
    const result = await videoeNewsServices.getAllVideoNews(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video news are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const getSingleVideoNews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await videoeNewsServices.getSingleVideoNews(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video news is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const deleteVideoNews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await videoeNewsServices.deleteVideoNews(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video news deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateVideoNews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await videoeNewsServices.updateVideoNews(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Video news update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const videoNewsControllers = {
  getAllVideoNews,
  getSingleVideoNews,
  deleteVideoNews,
  updateVideoNews,
  createVideoNews,
};
