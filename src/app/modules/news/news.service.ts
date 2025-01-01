/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { newsSearch } from './news.constant';
import { TNews } from './news.interface';
import { News } from './news.model';

const createNews = async (payload: TNews) => {
  const result = await News.create(payload);
  return result;
};

const getAllNews = async (query: Record<string, unknown>) => {
  const committeeQuery = new QueryBuilder(News.find(), query)
    .search(newsSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await committeeQuery.countTotal();
  const news = await committeeQuery.modelQuery;

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
