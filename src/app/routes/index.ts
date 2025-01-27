/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { videoNewsRoutes } from '../modules/videonews/videonews.route';
import { authRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { imgGalleryRoutes } from '../modules/image_gallery/img_gallery.route';
import { newsRoutes } from '../modules/news/news.route';
import { galleryRoutes } from '../modules/gallery/gallery.route';
import { categoryRoutes } from '../modules/category/category.route';
import { advertisementRoutes } from '../modules/advertisement/advertisement.route';
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
    path: '/video-news',
    route: videoNewsRoutes,
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
    path: '/news',
    route: newsRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/advertisement',
    route: advertisementRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
