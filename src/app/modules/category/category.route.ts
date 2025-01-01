import express from 'express';
import { CatgoryValidations } from './category.validation';
import { categoryControllers } from './category.controller';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(CatgoryValidations.categoryValidationSchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);
router.get('/:id', categoryControllers.getSingleCategory);
router.delete('/:id', categoryControllers.deleteCategory);
router.patch(
  '/:id',
  validateRequest(CatgoryValidations.updateValidationSchema),
  categoryControllers.updateCategory,
);

export const categoryRoutes = router;
