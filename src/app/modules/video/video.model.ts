import { Schema, model } from 'mongoose';
import { TVideo } from './video.interface';

const VideoSchema = new Schema<TVideo>(
  {
    images: {
      type: [String],
    },
    videoTitle: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
    photojournalistName: {
      type: String,
      required: [true, 'News type is required'],
    },
    description: {
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
  },
  {
    timestamps: true,
  },
);

export const Video = model<TVideo>('Video', VideoSchema);
