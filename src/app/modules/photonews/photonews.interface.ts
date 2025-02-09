import { Document } from "mongoose";

export interface IPhotoNews extends Document {
  title: string;
  description: string;
  images: string[];
  postDate: Date;
  adminName: string;
  slug: string;
  galleries: {
    photoes: string[];
    imageTagline: string;
  };
}
