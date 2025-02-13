import { StatusCodes } from 'http-status-codes';
import { CommentServices } from './comments.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';

const createComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  console.log('request user',req.user)
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
  const {blogId } = req.body

  const comment = await CommentServices.deleteComment(id as string, blogId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Comment delete successful.',
    data: comment,
  });
});

const getAllComment = catchAsync(async (req, res, next) => {
  try {
    const result = await CommentServices.getAllComment(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
export const commentController = {
  createComment,
  deleteComment,
  getAllComment,
};
