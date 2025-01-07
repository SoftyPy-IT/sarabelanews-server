import { Types } from 'mongoose';

export type TNews = {
  imageTagline: string;
  adminName: string;
   shortDescription: string;
  description: string;
  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
  images: string[];
  slug: string;
  category: Types.ObjectId;
  newsCategory: string;
  newsType: string;
  reporterName: string;
  reporterType: string;
  newsArea: string;
  newsTitle: string;
  newsTag:string,
  reportedDate: Date;
  publishedDate: Date;
  postDate:Date
};
