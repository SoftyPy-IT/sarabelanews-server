import express from 'express';
import { ImgGalleryValidations } from './img_gallery.validation';
import { imgGalleryControllers } from './img_gallery.controller';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(ImgGalleryValidations.createImgGalleryValidationSchema),
  imgGalleryControllers.createImgGallery,
);
router.get('/', imgGalleryControllers.getAllImgGallery);
router.get('/:id', imgGalleryControllers.getSingleImgGallery);
router.delete('/:id', imgGalleryControllers.deleteImgGallery);
router.patch(
  '/:id',
  validateRequest(ImgGalleryValidations.updateImgGalleryValidationSchema),
  imgGalleryControllers.updateImgGallery,
);

export const imgGalleryRoutes = router;
