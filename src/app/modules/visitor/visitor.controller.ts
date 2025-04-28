import httpStatus from 'http-status';
import { visitorServices } from './visitor.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const trackVisitor = catchAsync(async (req, res,) => {
  const visitor = await visitorServices.trackVisitor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Visitor tracked successfully',
    data: visitor,
  });
});

const getVisitors = catchAsync(async (req, res) => {
  const visitors = await visitorServices.getVisitors();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Visitors retrieved successfully',
    data: visitors,
  });
});

export const visitorControllers = {
  trackVisitor,
  getVisitors,
};
