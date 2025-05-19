import { Schema, model } from 'mongoose';
import { TNews } from './news.interface';

const newsSchema = new Schema<TNews>(
  {
    firstPage: {
      type: Boolean,
      required: [true, 'First page status is required'],
      default: false
    },
    reporterName: {
      type: String,
      required: [true, 'Reporter name is required'],
      trim: true,
    },
    reporterType: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
    
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    reportedDate: {
      type: Date,
      required: [true, 'Reported date is required'],
    },
    newsType: {
      type: String,
      required: [true, 'News type is required'],
    },
    newsLocation: { type: String, required: [true, 'news Location type is required'], },
    
    division: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    upazila: {
      type: String,
      trim: true,
    },
   

    images: {
      type: [String],
    },
    photojournalistName: {
      type: String,
      required: [true, 'Photojournalist name is required'],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
    newsCategory: {
      type: String,
    },
    newsTitle: {
      type: String,
      required: [true, 'News title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    imageTagline: {
      type: String,
      required: [true, 'Image tagline is required'],
      trim: true,
    },
    currentNews: {
      type: Boolean,
    
    },
    localNews: {
      type: Boolean,
      required: [true, 'Local news type is required'], 
   
    },   
    adminName: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },
    postDate: {
      type: Date,
    },
    newsTag: {
      type: [String],
      trim: true,
    },
    publishedDate: {
      type: Date,
    },
    publishedNews: {
      type: Boolean,
    },  
    metaTitle: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: [String],
  
    },
    metaDescription: {
      type: String,
    },  
  },
  {
    timestamps: true,
  },
);

export const News = model<TNews>('News', newsSchema);
