import { StatusCodes } from 'http-status-codes';
import { CommentServices } from './comments.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';

const createComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const comment = await CommentServices.createComment(
    req.user,
    id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Thank you for your feedback!',
    data: comment,
  });
});
const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {newsId } = req.body

  const comment = await CommentServices.deleteComment(id as string, newsId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Comment delete successful.',
    data: comment,
  });
});

const getAllComments = catchAsync(async (req, res, next) => {
  try {
    const result = await CommentServices.getAllComments(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comments are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteAllCommentsController = catchAsync(async (req, res, next) => {
  try {
    const result = await CommentServices.deleteAllComments();

    // Send a success response with the result of the deletion
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All comments have been deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});




export const commentController = {
  createComment,
  deleteComment,
  getAllComments,
  deleteAllCommentsController
};
