import { z } from 'zod';

const createNewsValidationSchema = z.object({
  body: z.object({
    reporterName: z.string({ required_error: 'Reporter name is required.' }),
    reporterType: z.string({ required_error: 'Reporter type is required.' }),
    reportedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Reported date must be a valid date string.',
    }),
    newsType: z.string({ required_error: 'News type is required.' }),
    division: z.string({ required_error: 'Division is required.' }),
    district: z.string({ required_error: 'District is required.' }),
    upazila: z.string({ required_error: 'Upazila is required.' }),
    internationalArea: z.string({
      required_error: 'International area is required.',
    }),
    displayLocation: z.string({
      required_error: 'Display location is required.',
    }),
    images: z
      .array(z.string({ required_error: 'At least one image is required.' }))
      .min(1, { message: 'At least one image is required.' }),
    photojournalistName: z.string({
      required_error: 'Photojournalist name is required.',
    }),
    category: z.string({ required_error: 'Category is required.' }),
    newsCategory: z.string({ required_error: 'News category is required.' }),
    newsTitle: z.string({ required_error: 'News title is required.' }),

    shortDescription: z.string({
      required_error: 'Short description is required.',
    }),
    description: z.string({ required_error: 'Description is required.' }),
    imageTagline: z.string({
      required_error: 'Image tagline is required.',
    }),
    currentNews: z.boolean({
      required_error: 'Current news status is required.',
    }),
    adminName: z.string({ required_error: 'Admin name is required.' }),
    postDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Post date must be a valid date string.',
    }),
    newsTag: z.string({ required_error: 'News tag is required.' }),
    publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Published date must be a valid date string.',
    }),
    publishedNews: z.boolean().optional(),
    metaTitle: z.string({ required_error: 'Meta title is required.' }),
    metaKeywords: z
      .array(z.string({ required_error: 'Meta keywords are required.' }))
      .min(1, { message: 'At least one meta keyword is required.' }),
    metaDescription: z.string({
      required_error: 'Meta description is required.',
    }),
  }),
});
const updateNewsValidationSchema = z.object({
  body: z.object({
    reporterName: z.string().optional(),
    reporterType: z.string().optional(),
    reportedDate: z.string().optional(),
    newsType: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
    internationalArea: z.string().optional(),
    displayLocation: z.string().optional(),
    images: z.array(z.string()).optional(),
    photojournalistName: z.string().optional(),
    category: z.string().optional(),
    newsCategory: z.string().optional(),
    newsTitle: z.string().optional(),
    slug: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    imageTagline: z.string().optional(),
    currentNews: z.boolean().optional(),
    adminName: z.string().optional(),
    postDate: z.string().optional(),
    newsTag: z.string().optional(),
    publishedNews: z.string().optional(),
    publishedDate: z.boolean().optional(),
    metaTitle: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    metaDescription: z.string().optional(),
  }),
});

export const newsValidations = {
  createNewsValidationSchema,
  updateNewsValidationSchema,
};
