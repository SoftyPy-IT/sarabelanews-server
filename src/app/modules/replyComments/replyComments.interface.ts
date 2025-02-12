import { Types } from 'mongoose';

export type TReplyComments = {
  user: Types.ObjectId;
  reply: string;
};
