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
    imgTagline: z
      .string({
        required_error: 'Image tagline is required',
      })
      .min(1, 'Image tagline cannot be empty'),
    images: z
    .string().optional(),
      // .array(z.string().url('Each image must be a valid URL'), {
      //   required_error: 'At least one image URL is required',
      // })
      // .min(1, 'Images array cannot be empty'),
    postDate: z.string({
      required_error: 'Post date is required',
    }),

    adminName: z.string({
      required_error: 'Admin name is required',
    }),
  }),
});

export const PhotoNewsValidations = {
  photoNewsValidationSchema,
};
