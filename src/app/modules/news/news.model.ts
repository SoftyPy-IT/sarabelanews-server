import mongoose, { Schema, model } from 'mongoose';
import { TNews } from './news.interface';

const newsSchema = new Schema<TNews>(
  {
    imageTagline: {
      type: String,
      required: true,
      trim: true,
    },
    adminName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaKeywords: {
      type: [String],
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, 
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  },
);

export const News = model<TNews>('News', newsSchema);
