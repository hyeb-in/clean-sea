import { Document, Types } from 'mongoose';
import { ILike } from 'liketype';

interface IReview extends Document {
  title?: string;
  content?: string;
  userName?: string;
  location?: string;
  author?: string;
  uploadFile?: string[];
  comments?: Types.ObjectId[];
  likeCount?: number;
  isLike?: 'yes' | 'no';
  Likes?: ILike[];
}

export { IReview };




