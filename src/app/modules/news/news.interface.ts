import { ObjectId } from 'mongoose';

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
  category: ObjectId;
};
