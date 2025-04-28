import mongoose, { Schema } from 'mongoose';
import { TSubscribe } from './subscribe.interface';

const subscribeSchema = new Schema<TSubscribe>(
  {
    endpoint: {
      type: String,
      required: true,
      unique: true,
    },
    expirationTime: {
      type: Number,
      required: false,
    },
    keys: {
      type: {
        p256dh: {
          type: String,
          required: true,
        },
        auth: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    // Optional: associate with user if authenticated
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    // Optional: device info
    userAgent: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscribe = mongoose.model<TSubscribe>('Subscribe', subscribeSchema);