/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';

import PhotoNews from './photonews.model';
import mongoose from 'mongoose';
import { createSlug } from '../../../utils/slug';
import { IPhotoNews } from './photonews.interface';

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

    // Generate slug from title
    const slug = createSlug(title);

    // Check if slug already exists
    const slugExists = await PhotoNews.findOne({ slug }).session(session);

    if (slugExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'A photo news article with this title already exists.',
      );
    }

    // Assign slug to payload
    payload.slug = slug;

    // Create document inside the transaction
    const result = await PhotoNews.create([payload], { session });

    await session.commitTransaction();
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllPhotonews = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(PhotoNews.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const photonews = await categoryQuery.modelQuery;

  return {
    meta,
    photonews,
  };
};
const getSinglePhotonews = async (slug: string) => {
  const result = await PhotoNews.findOne({ slug });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Photonews not found');
  }
  return result;
};
const getPhotonewsByID = async (id: string) => {
  console.log(id);
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

  return result;
};

const deletePhotonews = async (id: string) => {
  const result = await PhotoNews.deleteOne({ _id: id });

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
