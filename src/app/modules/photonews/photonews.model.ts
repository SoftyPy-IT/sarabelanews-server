import mongoose, { Schema } from "mongoose";
import { IPhotoNews } from "./photonews.interface";

const PhotoNewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    galleries: [
      {
        photos: {
          type: [String],
          default: [],
        },
        imageTagline: {
          type: String,
          trim: true,
        },
      },
    ],
    postDate: {
      type: Date,
      default: Date.now,
    },
    adminName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

PhotoNewsSchema.index({ title: 'text', description: 'text' });
PhotoNewsSchema.index({ postDate: -1 });
PhotoNewsSchema.index({ slug: 1 }, { unique: true });

const PhotoNews = mongoose.model<IPhotoNews>("PhotoNews", PhotoNewsSchema);
export default PhotoNews;
