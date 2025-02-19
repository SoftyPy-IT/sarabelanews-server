/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { Category } from '../category/category.model';
import { TNews } from './news.interface';
import { News } from './news.model';
import { AppError } from '../../error/AppError';
import mongoose from 'mongoose';
import { createSlug } from '../../../utils/slug';

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

    let slug = createSlug(payload.newsTitle);
    let slugExists = await News.findOne({ slug }).session(session);

    if (slugExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'A news article with this title already exists.',
      );
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
  let filterQuery = { ...query };


  if (query.category) {
    const category = await Category.findOne({ name: query.category }).select(
      '_id',
    );
    if (!category) {
      return {
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 0,
        },
        news: [],
      };
    }
    filterQuery.category = category._id;
  }

  const newsQuery = new QueryBuilder(News.find(), filterQuery)
    .search(['newsTitle', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  newsQuery.modelQuery.populate('category', 'name',);
  newsQuery.modelQuery.populate('comments'); 

  const meta = await newsQuery.countTotal();
  const news = await newsQuery.modelQuery.exec();

  return {
    meta,
    news,
  };
};

const getSingleNews = async (slug: string) => {
  const result = await News.findOne({ slug })
    .populate('category', 'name') 
    .populate({
      path: 'comments',
      populate: [
        { path: 'user', select: 'name email' }, 
        
      ],
    })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'News not found');
  }
  return result;
};
const getNewsByID = async (id: string) => {
  const result = await News.findById(id)
    .populate('category', 'name') 
    .populate({
      path: 'comments',
      populate: [
        { path: 'user', select: 'name email' }, 
        
      ],
    })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'News not found');
  }
  return result;
};




const updateNews = async (slug: string, payload: Partial<TNews>) => {
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

    // if (payload.newsTitle) {
    //   let slug = createSlug(payload.newsTitle);
    //   let slugExists = await News.findOne({ slug }).session(session);

    //   if (slugExists) {
    //     throw new AppError(
    //       httpStatus.CONFLICT,
    //       'A news article with this title already exists.',
    //     );
    //   }

    //   payload.slug = slug;
    // }

    const result = await News.findOneAndUpdate({slug}, payload, {
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
  console.log(id)

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
  getNewsByID
};
