import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { photoNewsControllers } from './photonews.controller';
import { PhotoNewsValidations } from './photonews.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(PhotoNewsValidations.photoNewsValidationSchema),
  photoNewsControllers.createPhotonews,
);
router.get('/', photoNewsControllers.getAllPhotonews);
router.get('/:id', photoNewsControllers.getSinglePhotonews);
router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  photoNewsControllers.deletePhotonews,
);
router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  photoNewsControllers.updatePhotonews,
);

export const photoNewsRoutes = router;
