import { Schema, model } from 'mongoose';
import { TVideoNews } from './videonews.interface';

const videoNewsSchema = new Schema<TVideoNews>(
  {
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
    newsType: {
      type: String,
      required: [true, 'News type is required'],
    },
    division: {
      type: String,
      required: [true, 'Division is required'],
      trim: true,
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true,
    },
    upazila: {
      type: String,
      required: [true, 'Upazila is required'],
      trim: true,
    },
    internationalArea: {
      type: String,
      trim: true,
    },
    displayLocation: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
    },
    photojournalistName: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
    newsCategory: {
      type: String,
    },
    newsTitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    imageTagline: {
      type: String,
      trim: true,
    },
    currentNews: {
      type: Boolean,
    },
    adminName: {
      type: String,
      trim: true,
    },
    postDate: {
      type: Date,
    },
    newsTag: {
      type: String,
      trim: true,
    },
    videioJornalistName: {
      type: String,
      trim: true,
    },
    newsTagLine: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: [true, 'Published date is required'],
    },
    publishedNews: {
      type: Boolean,
    },
    metaTitle: {
      type: String,
    },
    metaKeywords: {
      type: [String],
    },
    metaDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const VideoNews = model<TVideoNews>('VideoNews', videoNewsSchema);
