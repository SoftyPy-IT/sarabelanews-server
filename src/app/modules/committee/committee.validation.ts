import { z } from 'zod';

export const createCommitteeValidationSchema = z.object({
  body: z.object({
    bangla_name: z.string().optional(),
    english_name: z.string().optional(),
    designation_bangla: z.string().optional(),
    designation_english: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export const updateCommitteeValidationSchema = z.object({
  body: z.object({
    bangla_name: z.string().optional(),
    english_name: z.string().optional(),
    designation_bangla: z.string().optional(),
    designation_english: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),

  }),
});

export const committeeValidations = {
  createCommitteeValidationSchema,
  updateCommitteeValidationSchema,
};
