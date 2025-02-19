import { z } from 'zod';

export const createShareValidationSchema = z.object({
  body: z.object({
    newsId: z.string({ required_error: 'News ID is required' }),
    platform: z.string({ required_error: 'Platform is required' }),
  }),
});
