/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { videoRoutes } from '../modules/video/video.route';
import { authRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { imgGalleryRoutes } from '../modules/image_gallery/img_gallery.route';
import { committeeRoutes } from '../modules/committee/committee.route';
import { galleryRoutes } from '../modules/gallery/gallery.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },

  {
    path: '/video',
    route: videoRoutes,
  },
  {
    path: '/gallery',
    route: galleryRoutes,
  },

  {
    path: '/image-gallery',
    route: imgGalleryRoutes,
  },
  
  {
    path: '/committee',
    route: committeeRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
