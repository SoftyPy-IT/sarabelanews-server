/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';

import PhotoNews from './photonews.model';
import mongoose from 'mongoose';
import { createSlug } from '../../../utils/slug';
import { IPhotoNews } from './photonews.interface';
import Redis from 'ioredis';
import { clearCacheByPrefix } from '../../../utils/cleareCach';

const redis = new Redis();

const createPhotonews = async (payload: IPhotoNews) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, images } = payload;

    if (!title || !images) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'All required data is not provided.',
      );
    }
    const slug = createSlug(title);
    const slugExists = await PhotoNews.findOne({ slug }).session(session);

    if (slugExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'A photo news article with this title already exists.',
      );
    }
    payload.slug = slug;
    const result = await PhotoNews.create([payload], { session });
    await session.commitTransaction();
    await clearCacheByPrefix('photoNews');

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllPhotonews = async (query: Record<string, unknown>) => {
  const cacheKey = `photoNews:${JSON.stringify(query)}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log('✅ Redis Cache Hit (PhotoNews)');
    return JSON.parse(cached);
  }

  console.log('❌ Redis Cache Miss (PhotoNews)');

  const categoryQuery = new QueryBuilder(PhotoNews.find(), query)
    .search(['title', 'description', 'postDate'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const photonews = await categoryQuery.modelQuery.exec();

  const result = {
    meta,
    photonews,
  };
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 60);

  return result;
};
const getSinglePhotonews = async (slug: string) => {
  const result = await PhotoNews.findOne({ slug });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Photonews not found');
  }
  return result;
};
const getPhotonewsByID = async (id: string) => {
  const result = await PhotoNews.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Photonews not found');
  }
  return result;
};
const updatePhotonews = async (id: string, payload: Partial<IPhotoNews>) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Photo news ID is required.');
  }

  const result = await PhotoNews.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Photo news not found.');
  }
  await clearCacheByPrefix('photoNews');

  return result;
};

const deletePhotonews = async (id: string) => {
  const result = await PhotoNews.deleteOne({ _id: id });
  await clearCacheByPrefix('photoNews');

  return result;
};

export const photoNewsServices = {
  createPhotonews,
  getAllPhotonews,
  getSinglePhotonews,
  updatePhotonews,
  deletePhotonews,
  getPhotonewsByID,
};
