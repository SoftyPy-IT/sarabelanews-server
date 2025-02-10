import { z } from 'zod';

const photoNewsValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty')
      .max(200, 'Title cannot exceed 200 characters'),

    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, 'Description cannot be empty'),

    

    images: z
      .array(z.string(), {
        required_error: 'At least one image is required',
      })
      .min(1, 'Images array cannot be empty'),

    postDate: z
      .union([z.string().datetime(), z.date()])
      .refine((val) => !isNaN(new Date(val as string).getTime()), {
        message: 'Invalid date format',
      }),

    adminName: z
      .string({
        required_error: 'Admin name is required',
      })
      .min(1, 'Admin name cannot be empty'),


  }),
});

export default photoNewsValidationSchema;

export const PhotoNewsValidations = {
  photoNewsValidationSchema,
};
