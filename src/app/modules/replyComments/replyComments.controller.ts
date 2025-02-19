import { StatusCodes } from 'http-status-codes';
import { ReplyCommentServices } from './replyComments.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createReplyComment = catchAsync(async (req, res) => {
  const { id } = req.query;

  const comment = await ReplyCommentServices.createReplyComment(
    req.user,
    id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Thank you for your reply!',
    data: comment,
  });
});

export const replyCommentController = {
  createReplyComment,
};
