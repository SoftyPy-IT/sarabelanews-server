import express from 'express';
import { CatgoryValidations } from './category.validation';
import { categoryControllers } from './category.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin','super_admin'),
  validateRequest(CatgoryValidations.categoryValidationSchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);
router.get('/:id', categoryControllers.getSingleCategory);
router.delete('/:id',auth('admin','super_admin'), categoryControllers.deleteCategory);
router.patch(
  '/:id',
  auth('admin','super_admin'),
  validateRequest(CatgoryValidations.updateValidationSchema),
  categoryControllers.updateCategory,
);

export const categoryRoutes = router;
