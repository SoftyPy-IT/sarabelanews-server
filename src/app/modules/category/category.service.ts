/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { categorySearch } from './category.constant';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const getAllCategory = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const categories = await categoryQuery.modelQuery;

  return {
    meta,
    categories,
  };
};
const getSinigleCategory = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};
const updateCategory = async (id: string, payload: Partial<TCategory>) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await Category.deleteOne({ _id: id });

  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategory,
  getSinigleCategory,
  updateCategory,
  deleteCategory,
};
