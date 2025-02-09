import express from 'express';
import { newsControllers } from './news.controller';
import { newsValidations } from './news.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/',
  auth('admin','super_admin'),
  validateRequest(newsValidations.createNewsValidationSchema),
  newsControllers.createNews,
);
router.get('/', newsControllers.getAllNews);
router.get('/:slug', newsControllers.getSingleNews);
router.delete('/:id',auth('admin','super_admin'), newsControllers.deleteNews);
router.patch(
  '/:id',
  auth('admin','super_admin'),
  validateRequest(newsValidations.updateNewsValidationSchema),
  newsControllers.updateNews,
);

export const newsRoutes = router;
