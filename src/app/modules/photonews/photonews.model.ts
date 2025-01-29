import mongoose, { Schema, Document } from 'mongoose';

export interface IPhotoNews extends Document {
  title: string;
  description: string;
  imgTagline: string;
  images: string[];
  postDate: Date;
  adminName: string;
}

const PhotoNewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    imgTagline: {
      type: String,
      required: [true, 'Image tagline is required'],
      trim: true,
    },
    images: {
      type: [String],
      // required: [true, 'At least one image URL is required'],
    },
    postDate: {
      type: Date,
      required: [true, 'Post date is required'],
      default: Date.now,
    },
    adminName: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const PhotoNews = mongoose.model<IPhotoNews>('PhotoNews', PhotoNewsSchema);

export default PhotoNews;
