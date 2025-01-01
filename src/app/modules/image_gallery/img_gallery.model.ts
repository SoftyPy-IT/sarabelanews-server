import { Schema, model } from 'mongoose';
import { TImgGallery } from './img_gallery.interface';

const imgGallerySchema = new Schema<TImgGallery>(
  {
    bng_title: {
      type: String,
    },
    eng_title: {
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
