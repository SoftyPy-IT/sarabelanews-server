import  { Schema, model } from 'mongoose';
import { IShare } from './share.interface';

const ShareSchema = new Schema<IShare>(
  {
    newsId: { type: Schema.Types.ObjectId, ref: 'News', required: true },
    platform: { type: String, required: true },
    count: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Share = model<IShare>('Share', ShareSchema);
