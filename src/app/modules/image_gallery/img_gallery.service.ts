/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { comitteeSearch } from '../committee/committee.constant';

import { TImgGallery } from './img_gallery.interface';
import { ImgGallery } from './img_gallery.model';

const createImgGallery = async (payload: TImgGallery) => {
  const result = await ImgGallery.create(payload);
  return result;
};

const getAllImgGallery = async (query: Record<string, unknown>) => {
  const imgGalleryQuery = new QueryBuilder(ImgGallery.find(), query)
    .search(comitteeSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await imgGalleryQuery.countTotal();
  const galleries = await imgGalleryQuery.modelQuery;

  return {
    meta,
    galleries,
  };
};
const getSinigleImgGallery = async (id: string) => {
  const result = await ImgGallery.findById(id);
  return result;
};
const updateImgGallery = async (id: string, payload: Partial<TImgGallery>) => {

  const result = await ImgGallery.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteImgGallery = async (id: string) => {
  const result = await ImgGallery.deleteOne({ _id: id });

  return result;
};

export const imgGalleryServices = {
  createImgGallery,
  getAllImgGallery,
  getSinigleImgGallery,
  updateImgGallery,
  deleteImgGallery,
};
