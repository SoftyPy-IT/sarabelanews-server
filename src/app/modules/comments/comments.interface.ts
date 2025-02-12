import { ObjectId, Types } from 'mongoose';

export interface TComments {
  user: ObjectId; 
  news: ObjectId;
  comments: string;
  replyComments: Types.ObjectId[];
}
