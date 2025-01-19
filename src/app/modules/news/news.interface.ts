import { Types } from 'mongoose';

export type TNews = {
  reporterType: string;
  reporterName: string;
  newsArea: string;
  reportedDate: Date;
  adminName: string;
  images: string[];
  imageTagline: string;
  photoJournalistName: string;

  category: Types.ObjectId;

  newsCategory: string;
  
  publishedDate: Date;
  postDate: Date;
  shortDescription: string;
  description: string;
  
  slug: string; 
  
  newsType: string;
  newsTitle: string;
  newsTag: string;

  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
};
