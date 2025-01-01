import { Schema, model } from 'mongoose';
import { TCommitte } from './committee.interface';

const committeeSchema = new Schema<TCommitte>(
  {
    bangla_name: {
      type: String,
    },
    english_name: {
      type: String,
    },
    designation_bangla: {
      type: String,
    },
    designation_english: {
      type: String,
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Committe = model<TCommitte>('Committee', committeeSchema);
