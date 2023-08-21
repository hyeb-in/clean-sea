import { Document } from 'mongoose';

interface IReview extends Document {
  title?: string;
  content?: string;
  userName? : string;
  location? : string;
  author?: string;
  uploadFile?: [string];
}

export { IReview };