import express from 'express';
import { videoValidations } from './videonews.validation';
import { videoNewsControllers } from './videonews.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin','super_admin'),
  validateRequest(videoValidations.createVideoValidationSchema),
  videoNewsControllers.createVideoNews,
);
router.get('/', videoNewsControllers.getAllVideoNews);
router.get('/:slug', videoNewsControllers.getSingleVideoNews);
router.delete('/:id',auth('admin','super_admin'), videoNewsControllers.deleteVideoNews);
router.patch(
  '/:id',
  auth('admin','super_admin'),
  validateRequest(videoValidations.updateVideoValidationSchema),
  videoNewsControllers.updateVideoNews,
);

export const videoNewsRoutes = router;
