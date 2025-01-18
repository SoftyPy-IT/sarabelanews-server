/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { Category } from '../category/category.model';
import { newsSearch } from './news.constant';
import { TNews } from './news.interface';
import { News } from './news.model';
import { AppError } from '../../error/AppError';
import mongoose from 'mongoose';
import slugify from 'slugify';

const createNews = async (payload: TNews) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const categoryExists = await Category.findById(payload.category).session(
      session,
    );
    if (!categoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    let slug = slugify(payload.newsTitle, { lower: true, strict: true });
    let slugExists = await News.findOne({ slug }).session(session);
    let slugSuffix = 1;

    while (slugExists) {
      slug = `${slugify(payload.newsTitle, { lower: true, strict: true })}-${slugSuffix}`;
      slugExists = await News.findOne({ slug }).session(session);
      slugSuffix++;
    }

    payload.slug = slug;

    const result = await News.create([payload], { session });
    await session.commitTransaction();
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllNews = async (query: Record<string, unknown>) => {
  const newsQuery = new QueryBuilder(News.find(), query)
    .search(newsSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  newsQuery.modelQuery.populate('category', 'name');

  const meta = await newsQuery.countTotal();
  const news = await newsQuery.modelQuery;

  return {
    meta,
    news,
  };
};

const getSingleNews = async (id: string) => {
  const result = await News.findById(id).populate('category', 'name');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'News not found');
  }
  return result;
};
const updateNews = async (id: string, payload: Partial<TNews>) => {
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

    const result = await News.findByIdAndUpdate(id, payload, {
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

const deleteNews = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await News.findByIdAndDelete(id).session(session);
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
export const newsServices = {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
};
