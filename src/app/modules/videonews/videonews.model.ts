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
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    upazila: {
      type: String,
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
      required: [true, 'News title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Slug is required'],
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
      required: [true, 'Video URL is required'],
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
  }
);


videoNewsSchema.index({ newsTitle: 'text', description: 'text' });
videoNewsSchema.index({ category: 1 }); 
videoNewsSchema.index({ publishedDate: -1 }); 
videoNewsSchema.index({ slug: 1 }, { unique: true });

export const VideoNews = model<TVideoNews>('VideoNews', videoNewsSchema);
