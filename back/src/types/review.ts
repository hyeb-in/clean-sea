import { Document } from 'mongoose';

interface IReview extends Document {
  title: string;
  content: string;
  name : string;
  location? : string;
  author?: string;
  uploadFile?: string;
}

export { IReview };