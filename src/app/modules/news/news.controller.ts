import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { newsServices } from './news.service';

const createNews = async (req: Request, res: Response, next: NextFunction) => {
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
};
const getAllNews = async (req: Request, res: Response, next: NextFunction) => {
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
};
const getSingleNews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await newsServices.getSingleNews(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
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
};

const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await newsServices.updateNews(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'News update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const newsControllers = {
  getAllNews,
  getSingleNews,
  deleteNews,
  updateNews,
  createNews,
};
