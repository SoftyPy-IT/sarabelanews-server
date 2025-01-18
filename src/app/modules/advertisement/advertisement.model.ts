import mongoose, { Schema } from 'mongoose';
import { TAdvertisement } from './advertisement.interface';

const advertisementSchema: Schema = new Schema<TAdvertisement>(
  {
    advertisementImage: {
      type: String,
      required: [true, 'Advertisement image is required'],
      trim: true,
    },
    advertisementLink: {
      type: String,
      required: [true, 'Advertisement link is required'],
      trim: true,
    },
    displayLocation: {
      type: String,
      required: [true, 'Display location link is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Advertisement = mongoose.model<TAdvertisement>(
  'Advertisement',
  advertisementSchema,
);
