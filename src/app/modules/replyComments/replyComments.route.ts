import express from 'express';

import { replyCommentValidation } from './replyComments.validation';
import { replyCommentController } from './replyComments.controller';
import { validateRequest } from '../../middlewares/validateRequest';
 

const router = express.Router();

router
  .route('/create-replyComment')
  .post(
   
    validateRequest(replyCommentValidation.replyCommentValidationSchema),
    replyCommentController.createReplyComment,
  );
export const ReplyCommentRoutes = router;
