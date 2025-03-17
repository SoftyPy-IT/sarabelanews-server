import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import Visitor from './visitor.model';

const trackVisitor = async (payload: Record<string, unknown>) => {
  console.log('visitor tracking',payload);
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Visitor data is required');
  }
  const visitor = await Visitor.create(payload);
  return visitor;
};

const getVisitors = async () => {
  const visitors = await Visitor.find().sort({ visitedAt: -1 });
  if (!visitors) {
    throw new AppError(httpStatus.NOT_FOUND, 'No visitors found');
  }
  return visitors;
};

export const visitorServices = {
  trackVisitor,
  getVisitors,
};
