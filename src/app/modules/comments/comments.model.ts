import { Schema, model } from 'mongoose';
import { TComments } from './comments.interface';

const commentSchema = new Schema<TComments>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    news: {
      type: Schema.Types.ObjectId,
      ref: 'News',

    },
    replyComments: [{ type: Schema.Types.ObjectId, ref: 'ReplyComment' }],
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = model<TComments>('Comment', commentSchema);