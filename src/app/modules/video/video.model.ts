import { Schema, model } from 'mongoose';
import { TVideo } from './video.interface';

const videoSchema = new Schema<TVideo>(
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
      required: [true, 'International area is required'],
      trim: true,
    },
    displayLocation: {
      type: String,
      required: [true, 'Display location is required'],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, 'Images are required'],
    },
    photojournalistName: {
      type: String,
      required: [true, 'Photojournalist name is required'],
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
    newsTitle: {
      type: String,
      required: [true, 'News title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
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
      required: [true, 'Image tagline is required'],
      trim: true,
    },
    currentNews: {
      type: Boolean,
      required: [true, 'Current news status is required'],
    },
    adminName: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
    postDate: {
      type: Date,
      required: [true, 'Post date is required'],
    },
    newsTag: {
      type: String,
      required: [true, 'News tag is required'],
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

export const Video = model<TVideo>('Video', videoSchema);
