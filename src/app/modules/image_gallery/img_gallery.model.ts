import { Schema, model } from 'mongoose';
import { TImgGallery } from './img_gallery.interface';

const imgGallerySchema = new Schema<TImgGallery>(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

export const ImgGallery = model<TImgGallery>('ImgGallery', imgGallerySchema);
