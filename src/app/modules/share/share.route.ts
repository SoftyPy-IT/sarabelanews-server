import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createShareValidationSchema } from './share.validation';
import { createShare, getTotalShares } from './share.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(createShareValidationSchema),
  createShare,
);
router.get('/:newsId', getTotalShares);

export const ShareRoutes = router;
