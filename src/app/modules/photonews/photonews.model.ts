import mongoose, { Schema,  } from "mongoose";
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
    galleries: {
      photoes: {
        type: [String],
        default: [],
      },
      imageTagline: {
        type: String,
        trim: true,
      },
    },
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

const PhotoNews = mongoose.model<IPhotoNews>("PhotoNews", PhotoNewsSchema);

export default PhotoNews;
