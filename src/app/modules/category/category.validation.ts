import { z } from 'zod';

export const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'category is required' }),
  }),
});
export const updateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'category is required' }),
  }),
});

export const CatgoryValidations = {
  categoryValidationSchema,
  updateValidationSchema,
};
