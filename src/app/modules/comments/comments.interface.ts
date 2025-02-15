import { Types } from 'mongoose';

export interface TComments {
  user: Types.ObjectId;
  news: Types.ObjectId;
  comments: string;
  replyComments: Types.ObjectId[];
}