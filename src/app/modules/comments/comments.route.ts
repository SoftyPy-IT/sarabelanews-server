import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { commentController } from './comments.controller';
import { CommentValidationSchema } from './comments.validation';
const router = express.Router();

router.post(
  '/create-comment/:id',
  auth('admin','super_admin', 'user'),
  validateRequest(CommentValidationSchema),
  commentController.createComment,
);
router.get('/', commentController.getAllComment)


export const commentRoutes = router;
