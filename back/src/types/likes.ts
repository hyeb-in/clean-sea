import { Document } from 'mongoose';

enum TargetType {
    Beach = 'beach',
    Review = 'review',
  }
  
  interface ILike extends Document {
    userId: string;
    targetType: TargetType;
    targetId: string;
  }

  export { ILike };