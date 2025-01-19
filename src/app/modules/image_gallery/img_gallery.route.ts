import express from 'express';
import { ImgGalleryValidations } from './img_gallery.validation';
import { imgGalleryControllers } from './img_gallery.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin','super_admin'),
  validateRequest(ImgGalleryValidations.createImgGalleryValidationSchema),
  imgGalleryControllers.createImgGallery,
);
router.get('/', imgGalleryControllers.getAllImgGallery);
router.get('/:id', imgGalleryControllers.getSingleImgGallery);
router.delete('/:id',auth('admin','super_admin'), imgGalleryControllers.deleteImgGallery);
router.patch(
  '/:id',
  auth('admin','super_admin'),
  validateRequest(ImgGalleryValidations.updateImgGalleryValidationSchema),
  imgGalleryControllers.updateImgGallery,
);

export const imgGalleryRoutes = router;
