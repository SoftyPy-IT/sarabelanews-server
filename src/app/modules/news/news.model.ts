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
      required: [true, 'Admin Name name is required'],
      trim: true,
    },
    photoJournalistName: {
      type: String,
      required: [true, 'photoJournalistName name is required'],
      trim: true,
    },
    postDate: {
      type: Date,
      required: [true, 'Date is required'],
    },
    newsTitle: {
      type: String,
      required: [true, 'News title is required'],
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
    
    images: {
      type: [String],
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
    newsCategory: {
      type: String,
      required: [true, 'News category is required'],
    },
    newsType: {
      type: String,
      required: [true, 'News type is required'],
    },
    reporterName: {
      type: String,
      required: [true, 'Reporter name is required'],
      trim: true,
    },
    reporterType: {
      type: String,
      required: [true, 'Reporter type is required'],
      trim: true,
    },
    reportedDate: {
      type: Date,
      required: [true, 'Reported date is required'],
    },
    publishedDate: {
      type: Date,
      required: [true, 'Published date is required'],
    },
    newsArea: {
      type: String,
      required: [true, 'News area is required'],
      trim: true,
    },
    newsTag: {
      type: String,
      required: [true, 'News tag is required'],
      trim: true,
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
  },
  {
    timestamps: true,
  },
);

export const News = model<TNews>('News', newsSchema);
