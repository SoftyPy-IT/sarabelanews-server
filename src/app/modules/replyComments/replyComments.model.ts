import mongoose, { Model, Schema } from 'mongoose';
import { TReplyComments } from './replyComments.interface';

const replyCommentSchema: Schema<TReplyComments> = new Schema<TReplyComments>(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'User id is required.'],
    },
    
    reply: { type: String, required: [true, 'comment is required.'] },
  },
  {
    timestamps: true,
  },
);

export const ReplyComment: Model<TReplyComments> =
  mongoose.model<TReplyComments>('ReplyComment', replyCommentSchema);
