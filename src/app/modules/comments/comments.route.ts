import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { commentController } from './comments.controller';
import { CommentValidationSchema } from './comments.validation';
const router = express.Router();

router.delete('/deleteAll', commentController.deleteAllCommentsController);
router.post(
  '/create-comment/:id',
  auth('admin', 'super_admin', 'user'),
  validateRequest(CommentValidationSchema),
  commentController.createComment,
);
router.delete('/:newsId', commentController.deleteComment);
router.get('/', commentController.getAllComments);

export const commentRoutes = router;
