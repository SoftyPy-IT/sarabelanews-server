import { z } from 'zod';

const createImgGalleryValidationSchema = z.object({
  body: z.object({
    bng_title: z.string().optional(),
    eng_title: z.string().optional(),
    slug: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});
const updateImgGalleryValidationSchema = z.object({
  body: z.object({
    bng_title: z.string().optional(),
    eng_title: z.string().optional(),
    slug: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const ImgGalleryValidations = {
  createImgGalleryValidationSchema,
  updateImgGalleryValidationSchema,
};
