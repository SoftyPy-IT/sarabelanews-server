/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { newsServices } from './news.service';
import { catchAsync } from '../../../utils/catchAsync';



const createNews = catchAsync(async (req, res, next) => {
  try {
    const result = await newsServices.createNews(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const getAllNews = catchAsync(async (req, res, next) => {
  try {
    const result = await newsServices.getAllNews(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleNews = catchAsync(async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await newsServices.getSingleNews(slug);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getNewsByID = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await newsServices.getNewsByID(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteNews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await newsServices.deleteNews(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateNews = catchAsync(async (req, res, next) => {


  try {
    const { id } = req.params;
    const result = await newsServices.updateNews(id, req.body);

console.log("body",req.body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const newsControllers = {
  getAllNews,
  getSingleNews,
  deleteNews,
  updateNews,
  createNews,
  getNewsByID,
};
