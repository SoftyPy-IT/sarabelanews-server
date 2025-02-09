/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { imageGalleryController } from './gallery.controller';

import {
  deleteImageFromGallerySchema,
  uploadImageToGallerySchema,
  createFolderSchema,
} from './gallery.validation';
import { upload } from '../../../utils/sendImageToCloudinary';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router();

router.get('/all', imageGalleryController.getAllImages);
router.get(
  '/folder/:folder',
  auth('admin', 'super_admin'),
  imageGalleryController.getImagesByFolder,
);
router.post(
  '/upload',
  upload,
  auth('admin', 'super_admin'),
  // validateRequest(uploadImageToGallerySchema),
  imageGalleryController.createImage,
);

router.post(
  '/delete',
  auth('admin', 'super_admin'),
  validateRequest(deleteImageFromGallerySchema),
  imageGalleryController.deleteImage,
);

router.get('/folders', imageGalleryController.getFolders);

router.post(
  '/folder',
  auth('admin', 'super_admin'),
  validateRequest(createFolderSchema),
  imageGalleryController.createFolder,
);

router.delete(
  '/folder/:id',
  auth('admin', 'super_admin'),
  imageGalleryController.deleteFolder,
);

export const galleryRoutes = router;
