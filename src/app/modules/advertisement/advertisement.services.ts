import { AppError } from '../../error/AppError';
import { Advertisement } from './advertisement.model';
import { TAdvertisement } from './advertisement.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createAdvertisement = async (payload: TAdvertisement) => {
  const advertisementExists = await Advertisement.findOne({
    advertisementLink: payload.advertisementLink,
  });
  if (advertisementExists) {
    throw new AppError(httpStatus.CONFLICT, 'Advertisement already exists');
  }
  return Advertisement.create(payload);
};

const getAllAdvertisements = async (query: Record<string, unknown>) => {
  const advertisementQuery = new QueryBuilder(Advertisement.find(), query)
    .search(['advertisementLink', 'displayLocation']) // Add searchable fields
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await advertisementQuery.countTotal();
  const advertisements = await advertisementQuery.modelQuery;
  return { meta, advertisements };
};

const getSingleAdvertisement = async (id: string) => {
  return Advertisement.findById(id);
};
const updateAdvertisement = async (
  id: string,
  payload: Partial<TAdvertisement>,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid advertisement ID');
  }

  const existingAdvertisement = await Advertisement.findById(id);
  if (!existingAdvertisement) {
    throw new AppError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }

  const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedAdvertisement;
};

const deleteAdvertisement = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid advertisement ID');
  }
  const existingAdvertisement = await Advertisement.findById(id);
  if (!existingAdvertisement) {
    throw new AppError(httpStatus.NOT_FOUND, 'Advertisement not found');
  }

  const result = await Advertisement.findByIdAndDelete(id);

  return result;
};

export const advertisementServices = {
  createAdvertisement,
  getAllAdvertisements,
  getSingleAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
};
