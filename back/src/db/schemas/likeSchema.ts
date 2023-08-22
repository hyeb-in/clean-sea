import { Schema, model, Document } from 'mongoose';

enum TargetType {
  Beach = 'beach',
  Review = 'review',
}

interface ILike extends Document {
  userId: string;
  targetType: TargetType;
  targetId: string;
}

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
});

const LikeModel = model<ILike>('like', LikeSchema);
export { LikeModel, ILike };