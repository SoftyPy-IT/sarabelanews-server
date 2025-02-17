/* eslint-disable prefer-const */
import httpStatus from "http-status";
import { IShare } from "./share.interface";
import { AppError } from "../../error/AppError";
import { Share } from "./share.model";
import { News } from "../news/news.model";


const createShare = async (payload: IShare) => {
  const { newsId, platform } = payload;
  if (!newsId || !platform) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News ID and platform are required');
  }

  const news = await News.findById(newsId);
  if (!news) {
    throw new AppError(httpStatus.NOT_FOUND, 'News not found!');
  }

  let existingShare = await Share.findOne({ newsId, platform });

  if (existingShare) {
    existingShare.count += 1;
    await existingShare.save();
    return existingShare;
  }

  const newShare = await Share.create(payload);
  return newShare;
};


const getTotalShares = async (newsId: string) => {
  const shares = await Share.find({ newsId });
  const totalShares = shares.reduce((sum, item) => sum + item.count, 0);

  return { newsId, totalShares };
};

export const ShareService = { createShare, getTotalShares };
