/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { TComments } from './comments.interface';
import { Comment } from './comments.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import mongoose, { Types } from 'mongoose';
import { News } from '../news/news.model';
import { AppError } from '../../error/AppError';

const createComment = async (
  userData: JwtPayload,
  id: string,
  payload: TComments,
) => {
  // Extract userId instead of auth
  const { userId } = userData;

  // Check if ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid News ID format.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the existing user using userId
    const existingUser = await User.findById(userId).session(session);
    if (!existingUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "You can't comment here");
    }

    // Create the comment with the correct user ID
    const comments = {
      ...payload,
      user: existingUser._id,
    };

    const newComment = await Comment.create([comments], { session });

    // Check if News exists before updating
    const existingNews = await News.findById(id).session(session);
    if (!existingNews) {
      await Comment.findByIdAndDelete(newComment[0]?._id).session(session);
      throw new AppError(StatusCodes.BAD_REQUEST, 'This News does not exist.');
    }

    // Update the News with the new comment
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $push: { comments: newComment[0]?._id } },
      { new: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return newComment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof Error) {
      throw new AppError(StatusCodes.BAD_REQUEST, error.message);
    }
  }
};

const deleteComment = async (id: string, NewsId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingNews = await News.findByIdAndUpdate(
      NewsId,
      { $pull: { comments: id } },
      { new: true, session },
    );

    if (!existingNews) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'This comment does not exist.',
      );
    }

    const deleteComment = await Comment.findByIdAndDelete(id).session(session);

    if (!deleteComment) {
      throw new AppError(StatusCodes.NOT_FOUND, 'No comments exist');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteComment;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof Error) {
      throw new AppError(StatusCodes.BAD_REQUEST, error.message);
    }
  }
};

const getAllComments = async (query: Record<string, unknown>) => {
  const { id: newsId } = query;

  const filter: { news?: Types.ObjectId } = {};

  const comments = await Comment.find(filter).populate('user').exec();

  return comments;
};
const deleteAllComments = async () => {
  // Delete all comments in the collection
  const result = await Comment.deleteMany({}); 
  return result;
};


export const CommentServices = {
  createComment,
  deleteComment,
  getAllComments,
  deleteAllComments
};
