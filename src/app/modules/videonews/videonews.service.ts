/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { TVideoNews } from './videonews.interface';
import { VideoNews } from './videonews.model';
import { videoSearchabelField } from './videonews.constant';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Category } from '../category/category.model';
import { createSlug } from '../../../utils/slug';


const createVideoNews = async (payload: TVideoNews) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const categoryExists = await Category.findById(payload.category).session(
      session,
    );
    if (!categoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    const slug = createSlug(payload.newsTitle);
    const slugExists = await VideoNews.findOne({ slug }).session(session);

    if (slugExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'A news article with this title already exists.',
      );
    }

    payload.slug = slug;

    const result = await VideoNews.create([payload], { session });

    await session.commitTransaction();
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllVideoNews = async (query: Record<string, unknown>) => {
  query.sort = query.sort || '-date';
  const videoQuery = new QueryBuilder(VideoNews.find(), query)
    .search(videoSearchabelField)
    .filter()
    .sort()
    .paginate()
    .fields();
  videoQuery.modelQuery.populate('category', 'name');
  const meta = await videoQuery.countTotal();
  const videoNews = await videoQuery.modelQuery;

  return {
    meta,
    videoNews,
  };
};
const getSingleVideoNews = async (slug: string) => {
    const result = await VideoNews.findOne(slug);
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Video news not found');
    }
    return result;
  return result;
};

const updateVideoNews = async (id: string, payload: Partial<TVideoNews>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (payload.category) {
      const categoryExists = await Category.findById(payload.category).session(
        session,
      );
      if (!categoryExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
      }
    }

    if (payload.newsTitle) {
      const slug = createSlug(payload.newsTitle);
      const slugExists = await VideoNews.findOne({ slug }).session(session);

      // if (slugExists) {
      //   throw new AppError(
      //     httpStatus.CONFLICT,
      //     'A news article with this title already exists.',
      //   );
      // }

      payload.slug = slug;
    }

    const result = await VideoNews.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    }).populate('category', 'name');

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'News not found');
    }

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const deleteVideoNews = async (id: string) => {
  const result = await VideoNews.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Video news not found');
  }
  return result;
};

export const videoeNewsServices = {
  createVideoNews,
  getAllVideoNews,
  getSingleVideoNews,
  updateVideoNews,
  deleteVideoNews,
};
