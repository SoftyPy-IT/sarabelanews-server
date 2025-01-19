import { Types } from "mongoose";

export type TImgGallery = {
  title: string;
  slug: string;
  images: string[];
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
};
