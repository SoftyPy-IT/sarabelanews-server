import { z } from 'zod';

const replyCommentValidationSchema = z.object({
  body: z.object({
    reply: z.string({ required_error: 'Reply message is required.' }),
  }),
});

export const replyCommentValidation = {
  replyCommentValidationSchema,
};
