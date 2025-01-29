/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { TPhotoNews } from './photonews.interface';
import PhotoNews from './photonews.model';

const createPhotonews = async (payload: TPhotoNews) => {
  const { title, images } = payload;
  if (!title || images) {
    new AppError(httpStatus.NOT_FOUND, 'All data is not provider');
  }
  const result = await PhotoNews.create(payload);
  return result;
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
const getSiniglePhotonews = async (id: string) => {
  const result = await PhotoNews.findById(id);
  return result;
};
const updatePhotonews = async (id: string, payload: Partial<TPhotoNews>) => {
  const result = await PhotoNews.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletePhotonews = async (id: string) => {
  const result = await PhotoNews.deleteOne({ _id: id });

  return result;
};

export const photoNewsServices = {
  createPhotonews,
  getAllPhotonews,
  getSiniglePhotonews,
  updatePhotonews,
  deletePhotonews,
};
