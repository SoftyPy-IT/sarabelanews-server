/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { Category } from '../category/category.model';
import { newsSearch } from './news.constant';
import { TNews } from './news.interface';
import { News } from './news.model';
import { AppError } from '../../error/AppError';

const createNews = async (payload: TNews) => {
  const categoryExists = await Category.findById(payload.category);
  if (!categoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const result = await News.create(payload);
  return result;
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

const getSinigleNews = async (id: string) => {
  const result = await News.findById(id);
  return result;
};
const updateNews = async (id: string, payload: Partial<TNews>) => {
  const result = await News.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteNews = async (id: string) => {
  const result = await News.deleteOne({ _id: id });
  return result;
};

export const newsServices = {
  createNews,
  getAllNews,
  getSinigleNews,
  updateNews,
  deleteNews,
};
