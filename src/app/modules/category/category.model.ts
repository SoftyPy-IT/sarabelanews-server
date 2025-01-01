import mongoose, { Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema: Schema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model<TCategory>('Category', categorySchema);
