import express from 'express';
import { newsControllers } from './news.controller';
import { newsValidations } from './news.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/',
  validateRequest(newsValidations.createNewsValidationSchema),
  newsControllers.createNews,
);
router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getSingleNews);
router.delete('/:id', newsControllers.deleteNews);
router.patch(
  '/:id',
  validateRequest(newsValidations.updateNewsValidationSchema),
  newsControllers.updateNews,
);

export const newsRoutes = router;
