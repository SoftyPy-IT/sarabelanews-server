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
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Video = model<TVideo>('Video', VideoSchema);
