import { ObjectId } from "mongoose";

export interface IShare {
    newsId: ObjectId;
    platform: string;
    count: number;
  }
  