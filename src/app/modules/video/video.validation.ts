import { z } from 'zod';

const createVideoValidationSchema = z.object({
  body: z.object({
    images: z.array(z.string()).optional(),
    videoTitle: z.string().optional(),
    videoUrl: z.string({ required_error: 'Video URL is required!' }),
  }),
});
const updateVideoValidationSchema = z.object({
  body: z.object({
    images: z.array(z.string()).optional(),
    videoTitle: z.string().optional(),
    videoUrl: z.string({ required_error: 'Video URL is required!' }),
  }),
});

export const videoValidations = {
  createVideoValidationSchema,
  updateVideoValidationSchema,
};
