/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { TReplyComments } from './replyComments.interface';
import { ReplyComment } from './replyComments.model';
import { Comment } from '../comments/comments.model';
import { AppError } from '../../error/AppError';

const createReplyComment = async (
  userData: JwtPayload,
  id: string,
  payload: TReplyComments,
) => {
  const { auth } = userData;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid comment ID.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the existing user
    const existingUser = await User.findOne({ auth }).session(session);
    if (!existingUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "You can't comment here");
    }
    const existingComment = await Comment.findById(id).session(
      session,
    );
    if (!existingComment) {
      throw new AppError(StatusCodes.NOT_FOUND, 'No comments here.');
    }

    // Create the comment with the correct user ID
    const comments = {
      ...payload,
      user: existingUser._id,
    };

    const newComment = await ReplyComment.create([comments], { session });

    // Update the blog with the new comment
    const existingBlog = await Comment.findByIdAndUpdate(
      id,
      { $push: { reply_comments: newComment[0]?._id } },
      { new: true, session },
    );

    if (!existingBlog) {
      await ReplyComment.findByIdAndDelete(newComment[0]?._id).session(session);
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'This comment does not exist.',
      );
    }

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

export const ReplyCommentServices = {
  createReplyComment,
};
