import { z } from 'zod';

const createNewsValidationSchema = z.object({
  body: z.object({
    reporterName: z.string({ required_error: 'Reporter name is required.' }),
    reporterType: z.string({ required_error: 'Reporter type is required.' }),
    reportedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Reported date must be a valid date string.',
    }),
    newsType: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
    internationalArea: z.string().optional(),
    newsLocation: z.string({ required_error: 'news Location name is required.',}),
    images: z.array(z.string()).optional(),
    photojournalistName: z.string({
      required_error: 'Photojournalist name is required.',
    }),
    category: z.string({ required_error: 'Category is required.' }),
    newsCategory: z.string().optional(),
    newsTitle: z.string({ required_error: 'News title is required.' }),

    shortDescription: z.string({
      required_error: 'Short description is required.',
    }),
    description: z.string({ required_error: 'Description is required.' }),
    imageTagline: z.string().optional(),
    currentNews: z.boolean().optional(),

 
    localNews: z.boolean({
      required_error: "Local news status is required",
      invalid_type_error: "Local news must be a boolean",
    }),

    adminName: z.string().optional(),
    postDate: z.string().optional(),
    newsTag: z.array(z.string()).optional(),
    publishedDate: z.string().optional(),
    publishedNews: z.boolean().optional(),
    metaTitle: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    metaDescription: z.string().optional(),
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
    newsLocation: z.string().optional(),
    
    images: z.array(z.string()).optional(),
    photojournalistName: z.string().optional(),
    category: z.string().optional(),
    newsCategory: z.string().optional(),
    newsTitle: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    imageTagline: z.string().optional(),
    currentNews: z.boolean().optional(),
    localNews: z.boolean().optional(),
    adminName: z.string().optional(),
    postDate: z.string().optional(),
    newsTag: z.array(z.string()).optional(),
    // newsTag: z.string().optional(),
    publishedDate: z.string().optional(),
    publishedNews: z.boolean().optional(),
    metaTitle: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    metaDescription: z.string().optional(),
  }),
});

export const newsValidations = {
  createNewsValidationSchema,
  updateNewsValidationSchema,
};
