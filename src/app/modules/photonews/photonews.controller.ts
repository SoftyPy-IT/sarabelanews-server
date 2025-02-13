import httpStatus from 'http-status';

import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { photoNewsServices } from './photonews.service';

const createPhotonews = catchAsync(async (req, res, next) => {
  try {
    const result = await photoNewsServices.createPhotonews(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photonews create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllPhotonews = catchAsync(async (req, res, next) => {
  try {
    const result = await photoNewsServices.getAllPhotonews(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photonews are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const getSinglePhotonews = catchAsync(async (req, res, next) => {
  try {
    const { slug } = req.params; 
    const result = await photoNewsServices.getSinglePhotonews(slug);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photonews is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const deletePhotonews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await photoNewsServices.deletePhotonews(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photonews deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updatePhotonews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await photoNewsServices.updatePhotonews(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Photonews update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const photoNewsControllers = {
  getAllPhotonews,
  getSinglePhotonews,
  deletePhotonews,
  updatePhotonews,
  createPhotonews,
};
