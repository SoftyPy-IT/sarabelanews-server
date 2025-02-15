import { z } from 'zod';

export const CommentValidationSchema = z.object({
  body: z.object({
    // user: z.string({ required_error: 'News ID must be a valid ObjectId' }),
    replyComments: z
      .array(
        z
          .string()
          .regex(/^[0-9a-fA-F]{24}$/, {
            message: 'ReplyComment ID must be a valid ObjectId',
          }),
      )
      .optional(),
    comments: z.string({ message: 'Comment content is required' }),
  }),
});
