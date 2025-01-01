import { Schema, model } from 'mongoose';
import { TNews } from './news.interface';

const newsSchema = new Schema<TNews>(
  {
    imageTagline: {
      type: String,
      required: [true, 'Image tagline is required'],
      trim: true,
    },
    adminName: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    newsCategory: {
      type: String,
      required: [true, 'news category is required'],
    },
    newsType: {
      type: String,
      required: [true, 'news type is required'],
    },
    metaTitle: {
      type: String,
      required: [true, 'Meta title is required'],
    },
    metaKeywords: {
      type: [String],
      required: [true, 'Meta keywords are required'],
    },
    metaDescription: {
      type: String,
      required: [true, 'Meta description is required'],
    },
    images: {
      type: [String],
      required: [true, 'Images are required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  },
);

export const News = model<TNews>('News', newsSchema);
