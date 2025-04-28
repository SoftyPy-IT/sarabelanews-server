/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { subscribeSearch } from './subscribe.contant';
import { TSubscribe } from './subscribe.interface';
import { Subscribe } from './subscribe.model';
import webPush from 'web-push';

// Configure webPush with your VAPID keys
// This should be called once when your server starts
webPush.setVapidDetails(
  'mailto:ibrahimsikder5033@gmail.com',
  config.VAPID_PUBLIC_KEY!,
  config.VAPID_PRIVATE_KEY!,
);

const createSubscribe = async (payload: TSubscribe) => {
  console.log('subscription payload', payload);
  try {
    // Validate the subscription object
    if (
      !payload.endpoint ||
      !payload.keys ||
      !payload.keys.p256dh ||
      !payload.keys.auth
    ) {
      throw new Error('Invalid subscription object');
    }

    // Check if a subscription with the same endpoint exists
    const existing = await Subscribe.findOne({ endpoint: payload.endpoint });
    if (!existing) {
      const result = await Subscribe.create(payload);
      return result;
    }
    return existing;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

const getAllSubscribe = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Subscribe.find(), query)
    .search(subscribeSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const subscribes = await queryBuilder.modelQuery;

  return {
    meta,
    subscribes,
  };
};

const deleteSubscribe = async (id: string) => {
  const result = await Subscribe.findByIdAndDelete(id);
  return result;
};

// Delete subscription by endpoint
const deleteSubscribeByEndpoint = async (endpoint: string) => {
  const result = await Subscribe.findOneAndDelete({ endpoint });
  return result;
};

const sendNotification = async (payload?: {
  title?: string;
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: any;
  actions?: Array<{ action: string; title: string; icon?: string }>;
  tag?: string;
  requireInteraction?: boolean;
  renotify?: boolean;
  silent?: boolean;
  url?: string;
}) => {
  try {
    const subscriptions = await Subscribe.find({});

    if (subscriptions.length === 0) {
      return { count: 0, message: 'No subscriptions found' };
    }

    // Default notification content
    const notificationPayload = {
      title: payload?.title || 'SarabelaNews24 Update',
      body: payload?.body || 'Check out our latest news!',
      icon: payload?.icon || '/icon.png',
      badge: payload?.badge,
      image: payload?.image,
      data: {
        url: payload?.url || '/',
        ...payload?.data,
      },
      actions: payload?.actions,
      tag: payload?.tag,
      requireInteraction: payload?.requireInteraction,
      renotify: payload?.renotify,
      silent: payload?.silent,
    };

    // Send push notifications to all subscribers with proper error handling
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webPush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.keys.p256dh,
                auth: sub.keys.auth,
              },
            },
            JSON.stringify(notificationPayload),
          );
          return { success: true, endpoint: sub.endpoint };
        } catch (error: any) {
          // If subscription is expired or invalid (status 410), remove it
          if (error.statusCode === 410) {
            await deleteSubscribeByEndpoint(sub.endpoint);
            return {
              success: false,
              endpoint: sub.endpoint,
              error: 'Subscription expired',
              removed: true,
            };
          }
          return {
            success: false,
            endpoint: sub.endpoint,
            error: error.message || 'Unknown error',
          };
        }
      }),
    );

    // Count successful and failed notifications
    const successful = results.filter(
      (r) => r.status === 'fulfilled' && (r.value as any).success,
    ).length;
    const failed = results.filter(
      (r) => r.status === 'rejected' || !(r.value as any).success,
    ).length;
    const removed = results.filter(
      (r) => r.status === 'fulfilled' && (r.value as any).removed,
    ).length;

    return {
      total: subscriptions.length,
      successful,
      failed,
      removed,
      details: results,
    };
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
};

// Send notification to a specific subscription
const sendNotificationToOne = async (
  subscriptionId: string,
  payload?: {
    title?: string;
    body?: string;
    icon?: string;
    url?: string;
    [key: string]: any;
  },
) => {
  try {
    const subscription = await Subscribe.findById(subscriptionId);

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const notificationPayload = {
      title: payload?.title || 'SarabelaNews24 Update',
      body: payload?.body || 'Check out our latest news!',
      icon: payload?.icon || '/icon.png',
      ...payload,
    };

    await webPush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      },
      JSON.stringify(notificationPayload),
    );

    return { success: true, subscription };
  } catch (error: any) {
    // If subscription is expired or invalid (status 410), remove it
    if (error.statusCode === 410) {
      await deleteSubscribe(subscriptionId);
      throw new Error('Subscription expired and has been removed');
    }
    throw error;
  }
};

export const subscribeServices = {
  createSubscribe,
  getAllSubscribe,
  deleteSubscribe,
  deleteSubscribeByEndpoint,
  sendNotification,
  sendNotificationToOne,
};
