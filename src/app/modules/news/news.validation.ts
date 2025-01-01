import { z } from 'zod';

export const createNewsValidationSchema = z.object({
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

export const updateNewsValidationSchema = z.object({
  body: z.object({
    imageTagline: z.string().trim().min(1, { message: "Image tagline is required." }),
    adminName: z.string().trim().min(1, { message: "Admin name is required." }),
    date: z.string().min(1, { message: "Date is required." }),
    title: z.string().trim().min(1, { message: "Title is required." }),
    shortDescription: z
      .string()
      .min(1, { message: "Short description is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    metaTitle: z.string().min(1, { message: "Meta title is required." }),
    metaKeywords: z
      .array(z.string())
      .min(1, { message: "At least one meta keyword is required." }),
    metaDescription: z
      .string()
      .min(1, { message: "Meta description is required." }),
    images: z
      .array(z.string())
      .min(1, { message: "At least one image is required." }),
    slug: z.string().min(1, { message: "Slug is required." }),
    category: z.string().min(1, { message: "Category is required." }),
  }),
});

export const newsValidations = {
  createNewsValidationSchema,
  updateNewsValidationSchema,
};
