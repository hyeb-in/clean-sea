import { Document } from 'mongoose';
import { ILike } from 'likes';

interface IReview extends Document {
  title?: string;
  content?: string;
  userName? : string;
  location? : string;
  author?: string;
  uploadFile?: [string];
  isLike?: 'yes' | 'no';
  Likes? : ILike[];
}

export { IReview };