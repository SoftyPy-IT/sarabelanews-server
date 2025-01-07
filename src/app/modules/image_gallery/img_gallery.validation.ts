import { z } from 'zod';

const createImgGalleryValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string({
      required_error: 'Category is required',
    }),
    photojournalistName: z.string({
      required_error: 'News type is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    reporterName: z.string({
      required_error: 'Reporter name is required',
    }),
    reporterType: z.string({
      required_error: 'Reporter type is required',
    }),
    reportedDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Reported date must be a valid date string',
      })
      .refine((val) => val !== '', {
        message: 'Reported date is required',
      }),
    publishedDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Published date must be a valid date string',
      })
      .refine((val) => val !== '', {
        message: 'Published date is required',
      }),
    newsArea: z.string({
      required_error: 'News area is required',
    }),
  }),
});
const updateImgGalleryValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
    photojournalistName: z.string().optional(),
    description: z.string().optional(),
    reporterName: z.string().optional(),
    reporterType: z.string().optional(),
    reportedDate: z.string().optional(),
    publishedDate: z.string().optional(),
    newsArea: z.string().optional(),
  }),
});

export const ImgGalleryValidations = {
  createImgGalleryValidationSchema,
  updateImgGalleryValidationSchema,
};
