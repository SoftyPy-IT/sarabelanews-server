import express from 'express';
import { UserController } from './user.controller';
import { userValidations } from './user.validation';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/',  UserController.getAllUser);

router.get('/me', auth('admin', 'editor', 'super_admin'), UserController.getCurrentUser);

router.post(
  '/',
  validateRequest(userValidations.createUserValidation), 
  UserController.createUser,
);

router.patch('/:id', auth('admin','super_admin'), UserController.updateUser);

router.delete('/:id', auth('admin','super_admin'), UserController.deleteUser);

export const userRoutes = router;
