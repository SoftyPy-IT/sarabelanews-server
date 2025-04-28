import express from 'express';

import { visitorControllers } from './visitor.controller';

const router = express.Router();

router.post('/', visitorControllers.trackVisitor);

router.get('/', visitorControllers.getVisitors);

export const visitorRoute = router;
