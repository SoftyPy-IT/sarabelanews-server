import { Types } from 'mongoose';

export interface TVideo {
  images: string[];
  videoTitle: string;
  videoUrl: string;
  category: Types.ObjectId;
  description:string;
  photojournalistName: string;
  reporterName: string;
  reporterType: string;
  newsArea: string;
  newsTitle: string;
  reportedDate: Date;
  publishedDate: Date;
  postDate: Date;
}

