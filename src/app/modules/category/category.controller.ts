import httpStatus from 'http-status';
import { categoryServices } from './category.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createCategory = catchAsync(async (req, res, next) => {
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
});

const getAllCategory = catchAsync(async (req, res, next) => {
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
});
const getSingleCategory = catchAsync(async (req, res, next) => {
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
});
const deleteCategory = catchAsync(async (req, res, next) => {
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
});

const updateCategory = catchAsync(async (req, res, next) => {
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
});

export const categoryControllers = {
  getAllCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
  createCategory,
};
