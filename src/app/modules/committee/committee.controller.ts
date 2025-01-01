import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { committeeServices } from './committee.service';

const createCommittee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await committeeServices.createCommittee(req.body);


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllCommittee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await committeeServices.getAllCommittee(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleCommittee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await committeeServices.getSinigleCommittee(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCommittee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await committeeServices.deleteCommittee(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCommittee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await committeeServices.updateCommittee(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Committee update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const committeeControllers = {
  getAllCommittee,
  getSingleCommittee,
  deleteCommittee,
  updateCommittee,
   createCommittee,
};
