import { z } from 'zod';

const createNewsValidationSchema = z.object({
  body: z.object({
    imageTagline: z.string().optional(),
    adminName: z.string({ required_error: 'Admin name is required.' }),
    postDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Date must be a valid date string.',
    }),
    newsTitle: z.string({ required_error: 'News title is required.' }),
    shortDescription: z.string({
      required_error: 'Short description is required.',
    }),
    description: z.string({ required_error: 'Description is required.' }),
    metaTitle: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    metaDescription: z.string().optional(),
    images: z.array(
      z.string({ required_error: 'At least one image is required.' }),
    ),
    slug: z.string({ required_error: 'slug is required.' }),
    category: z.string({ required_error: 'Category is required.' }),
    newsCategory: z.string({ required_error: 'News category is required.' }),
    newsType: z.string({ required_error: 'News type is required.' }),
    reporterName: z.string({ required_error: 'Reporter name is required.' }),
    reporterType: z.string({ required_error: 'Reporter type is required.' }),
    reportedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Reported date must be a valid date string.',
    }),
    publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Published date must be a valid date string.',
    }),
    newsArea: z.string({ required_error: 'News area is required.' }),
    newsTag: z.string().optional(),
  }),
});

export const updateNewsValidationSchema = z.object({
  body: z.object({
    imageTagline: z
      .string()
      .trim()
      .min(1, { message: 'Image tagline is required.' }),
    adminName: z.string().trim().min(1, { message: 'Admin name is required.' }),
    date: z.string().min(1, { message: 'Date is required.' }),
    title: z.string().trim().min(1, { message: 'Title is required.' }),
    shortDescription: z
      .string()
      .min(1, { message: 'Short description is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    metaTitle: z.string().min(1, { message: 'Meta title is required.' }),
    metaKeywords: z
      .array(z.string())
      .min(1, { message: 'At least one meta keyword is required.' }),
    metaDescription: z
      .string()
      .min(1, { message: 'Meta description is required.' }),
    images: z
      .array(z.string())
      .min(1, { message: 'At least one image is required.' }),
    slug: z.string().min(1, { message: 'Slug is required.' }),
    category: z.string().min(1, { message: 'Category is required.' }),
  }),
});

export const newsValidations = {
  createNewsValidationSchema,
  updateNewsValidationSchema,
};
