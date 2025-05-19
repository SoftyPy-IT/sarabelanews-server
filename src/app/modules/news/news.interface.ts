import { Types } from 'mongoose';

export type TNews = {
  firstPage: boolean,
  reporterName: string;
  reporterType: string;
  reportedDate: Date;
  newsType: string;
  comments: Types.ObjectId[];
  division: string;
  district: string;
  upazila: string;
  internationalArea: string;
  newsLocation: string;
  images: string[];
  photojournalistName: string;
  category: Types.ObjectId;
  newsCategory: string;
  newsTitle: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageTagline: string;
  currentNews: boolean;
  localNews: boolean;
  adminName: string;
  postDate: Date;
  newsTag: [string];
  publishedDate: Date;
  publishedNews:boolean;
  metaTitle: string;
  metaKeywords: string[];
  metaDescription: string;
};
