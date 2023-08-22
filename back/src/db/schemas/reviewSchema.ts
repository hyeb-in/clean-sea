import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface IReview extends Document {
    title?: string;
    content?: string;
    userName? : string;
    location? : string;
    author?: string;
    uploadFile?: [string];
    comments?: Types.ObjectId[];
    likeCount? : number;
}

const ReviewSchema : Schema<IReview> = new Schema({
    userName : {
        type : String,
    },
    location : {
        type : String,
    },
    title : {
        type : String,
    },
    content : {
        type : String,
    },
    author : {
        type : String,
    },
    uploadFile : {
        type : [String],
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
      likeCount : {
        type :Number,
        default : 0,
      },
    },

    {
        timestamps : true,
    }

);

const ReviewModel = model<IReview>('review', ReviewSchema);
export { ReviewModel, IReview };