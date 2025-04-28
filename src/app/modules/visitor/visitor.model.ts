import mongoose, { Schema, Document, Model } from 'mongoose';
import { IVisitor } from './Visitor.interface';

interface IVisitorDocument extends IVisitor, Document {}

const VisitorSchema: Schema<IVisitorDocument> = new Schema({
  ip: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  isp: { type: String, required: true },
  browser: { type: String, required: true },
  referrer: { type: String },
  visitedAt: { type: Date, default: Date.now },
});

const Visitor: Model<IVisitorDocument> = mongoose.model<IVisitorDocument>('Visitor', VisitorSchema);
export default Visitor;
