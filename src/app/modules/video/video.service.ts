/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { TVideo } from './video.interface';
import { Video } from './video.model';
import { videoSearchabelField } from './video.constant';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Category } from '../category/category.model';

const createVideo = async (payload: TVideo) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if category exists
    const categoryExists = await Category.findById(payload.category).session(
      session,
    );
    if (!categoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    // Basic URL validation
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(payload.videoUrl)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid video URL');
    }

    // Create the video document in the session
    const result = await Video.create([payload], { session });
    await session.commitTransaction();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllVideo = async (query: Record<string, unknown>) => {
  query.sort = query.sort || '-date';
  const videoQuery = new QueryBuilder(Video.find(), query)
    .search(videoSearchabelField)
    .filter()
    .sort()
    .paginate()
    .fields();
  videoQuery.modelQuery.populate('category', 'name');
  const meta = await videoQuery.countTotal();
  const videos = await videoQuery.modelQuery;

  return {
    meta,
    videos,
  };
};
const getSinigleVideo = async (id: string) => {
  const result = await Video.findById(id);
  return result;
};
const updateVideo = async (id: string, payload: Partial<TVideo>) => {
  if (payload.videoUrl) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(payload.videoUrl)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid video URL');
    }
  }
  const result = await Video.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteVideo = async (id: string) => {
  const result = await Video.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
  }
  return result;
};

export const videoervices = {
  createVideo,
  getAllVideo,
  getSinigleVideo,
  updateVideo,
  deleteVideo,
};
