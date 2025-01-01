import { Types } from 'mongoose';

export type TNews = {
  imageTagline: string;
  adminName: string;
  date: string;
  title: string;
  shortDescription: string;
  description: string;
  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
  images: string[];
  slug: string;
  category: Types.ObjectId;
  newsCategory:string;
  newsType:string
};

