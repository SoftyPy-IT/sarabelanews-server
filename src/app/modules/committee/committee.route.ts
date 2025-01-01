import express from 'express';
import { committeeControllers } from './committee.controller';
import { committeeValidations } from './committee.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/',
  validateRequest(committeeValidations.createCommitteeValidationSchema),
  committeeControllers.createCommittee,
);
router.get('/', committeeControllers.getAllCommittee);
router.get('/:id', committeeControllers.getSingleCommittee);
router.delete('/:id', committeeControllers.deleteCommittee);
router.patch(
  '/:id',
  validateRequest(committeeValidations.updateCommitteeValidationSchema),
  committeeControllers.updateCommittee,
);

export const committeeRoutes = router;
