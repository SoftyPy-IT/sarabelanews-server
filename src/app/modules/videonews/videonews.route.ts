import express from 'express';
import { videoValidations } from './videonews.validation';
import { videoNewsControllers } from './videonews.controller';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(videoValidations.createVideoValidationSchema),
  videoNewsControllers.createVideoNews,
);
router.get('/', videoNewsControllers.getAllVideoNews);
router.get('/:id', videoNewsControllers.getSingleVideoNews);
router.delete('/:id', videoNewsControllers.deleteVideoNews);
router.patch(
  '/:id',
  validateRequest(videoValidations.updateVideoValidationSchema),
  videoNewsControllers.updateVideoNews,
);

export const videoNewsRoutes = router;
