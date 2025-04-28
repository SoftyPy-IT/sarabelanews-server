import express from 'express';
import { subscribeControllers } from './subscribe.controller';

const router = express.Router();

// Create a new subscription
router.post('/', subscribeControllers.createSubscribe);

// Get all subscriptions
router.get('/', subscribeControllers.getAllSubscribe);

// Delete a subscription
router.delete('/:id', subscribeControllers.deleteSubscribe);

// Send notification to all subscribers
router.post('/send-notification', subscribeControllers.sendNotification);

// Send notification to a specific subscriber
router.post('/send-notification/:id', subscribeControllers.sendNotificationToOne);

export const subscribeRoutes = router;