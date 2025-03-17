import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { subscribeServices } from './subscribe.service';

const createSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await subscribeServices.createSubscribe(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await subscribeServices.getAllSubscribe(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscriptions retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await subscribeServices.deleteSubscribe(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Controller for sending notifications to all subscribers
const sendNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get notification payload from request body
    const notificationPayload = req.body;
    
    const result = await subscribeServices.sendNotification(notificationPayload);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notifications sent successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Controller for sending notification to a specific subscriber
const sendNotificationToOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const notificationPayload = req.body;
    
    const result = await subscribeServices.sendNotificationToOne(id, notificationPayload);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification sent successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const subscribeControllers = {
  createSubscribe,
  getAllSubscribe,
  deleteSubscribe,
  sendNotification,
  sendNotificationToOne
};