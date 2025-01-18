import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { advertisementControllers } from './advertisement.controller';
import { advertisementValidations } from './advertisement.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(advertisementValidations.createAdvertisementValidationSchema),
  advertisementControllers.createadvertisement,
);
router.get('/', advertisementControllers.getAlladvertisement);
router.get('/:id', advertisementControllers.getSingleadvertisement);
router.delete('/:id', advertisementControllers.deleteadvertisement);
router.patch(
  '/:id',
  validateRequest(advertisementValidations.updateAdvertisementValidationSchema),
  advertisementControllers.updateadvertisement,
);

export const advertisementRoutes = router;
