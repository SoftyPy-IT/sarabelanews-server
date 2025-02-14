import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { NextFunction, Request, Response } from 'express';
import { ShareService } from './share.service';

export const createShare = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ShareService.createShare(req.body);
      console.log(req.body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Share recorded successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);

export const getTotalShares = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ShareService.getTotalShares(req.params.newsId);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Total shares retrieved successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);
