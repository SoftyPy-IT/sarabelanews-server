import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

import { categoryServices } from './category.service';
import sendResponse from '../../../utils/sendResponse';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryServices.createCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryServices.getAllCategory(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.getSinigleCategory(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.deleteCategory(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.updateCategory(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const categoryControllers = {
  getAllCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
  createCategory,
};
