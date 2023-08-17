import { Document } from 'mongoose';

interface IReview extends Document {
  title: string;
  content: string;
  author?: string;
  fileUpload?: string;
}

export { IReview };