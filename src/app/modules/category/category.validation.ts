import { z } from 'zod';

export const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'category is required' }),
    slug: z.string({ required_error: 'category is required' }),
  }),
});
export const updateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const CatgoryValidations = {
  categoryValidationSchema,
  updateValidationSchema,
};
