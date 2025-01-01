import { z } from 'zod';

const createVideoValidationSchema = z.object({
  body: z.object({
    images: z.array(z.string()).optional(),
    video_title_bangla: z.string().optional(),
    video_title_english: z.string().optional(), 
    video_url: z.string({required_error:'Video URL is required!'}), 
  }),
});
const updateVideoValidationSchema = z.object({
  body: z.object({
    images: z.array(z.string()).optional(),
    video_title_bangla: z.string().optional(),
    video_title_english: z.string().optional(), 
    video_url: z.string({required_error:'Video URL is required!'}), 
  }),
});

export const videoValidations = {
  createVideoValidationSchema,
  updateVideoValidationSchema,
};
