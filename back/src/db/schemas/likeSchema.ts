import { Schema, model } from 'mongoose';
import { ILike, TargetType } from '../../types/likes';

const LikeSchema: Schema<ILike> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  targetType: {
    type: String,
    enum: [TargetType.Beach, TargetType.Review],
    required: true,
  },
  targetId: {
    type: String,
    required: true,
  },
  isLike : {
    type : String,
    enum : ['yes', 'no'],
  }
});

const LikeModel = model<ILike>('like', LikeSchema);
export { LikeModel, ILike };