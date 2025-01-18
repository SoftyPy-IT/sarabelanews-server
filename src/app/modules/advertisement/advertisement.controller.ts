import httpStatus from 'http-status';

import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { advertisementServices } from './advertisement.services';

const createadvertisement = catchAsync(async (req, res, next) => {
  try {
    const result = await advertisementServices.createAdvertisement(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'advertisement create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAlladvertisement = catchAsync(async (req, res, next) => {
  try {
    const result = await advertisementServices.getAllAdvertisements(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'advertisement are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const getSingleadvertisement = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await advertisementServices.getSingleAdvertisement(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'advertisement is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const deleteadvertisement = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await advertisementServices.deleteAdvertisement(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'advertisement deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateadvertisement = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await advertisementServices.updateAdvertisement(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'advertisement update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const advertisementControllers = {
  getAlladvertisement,
  getSingleadvertisement,
  deleteadvertisement,
  updateadvertisement,
  createadvertisement,
};
