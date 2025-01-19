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
      z.string().optional(),
    ).optional(),
    slug: z.string({ required_error: 'slug is required.' }),
    category: z.string({ required_error: 'Category is required.' }),
    newsCategory: z.string({ required_error: 'News category is required.' }),
    newsType: z.string().optional(),
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
    imageTagline: z.string().optional(),
    adminName: z.string().optional(),
    postDate: z.string().optional(),
    newsTitle: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    metaDescription: z.string().optional(),
    images: z.array(z.string()).optional(),
    slug: z.string().optional(),
    category: z.string().optional(),
    newsCategory: z.string().optional(),
    newsType: z.string().optional(),
    reporterName: z.string().optional(),
    reporterType: z.string().optional(),
    reportedDate: z.string().optional(),
    publishedDate: z.string().optional(),
    newsArea: z.string().optional(),
    newsTag: z.string().optional(),
  }),
});

export const newsValidations = {
  createNewsValidationSchema,
  updateNewsValidationSchema,
};
