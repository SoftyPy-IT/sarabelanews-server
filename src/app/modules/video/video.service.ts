/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { TVideo } from './video.interface';
import { Video } from './video.model';
import { videoSearchabelField } from './video.constant';

const createVideo = async (payload: TVideo) => {
  const result = await Video.create(payload);
  return result;
};

const getAllVideo = async (query: Record<string, unknown>) => {
  query.sort = query.sort || '-date';
  const videoQuery = new QueryBuilder(Video.find(), query)
    .search(videoSearchabelField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await videoQuery.countTotal();
  const videos = await videoQuery.modelQuery;

  return {
    meta,
    videos,
  };
};
const getSinigleVideo = async (id: string) => {
  const result = await Video.findById(id);
  return result;
};
const updateVideo = async (id: string, payload: Partial<TVideo>) => {
  const result = await Video.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteVideo = async (id: string) => {
  const result = await Video.deleteOne({ _id: id });

  return result;
};

export const videoervices = {
  createVideo,
  getAllVideo,
  getSinigleVideo,
  updateVideo,
  deleteVideo,
};
