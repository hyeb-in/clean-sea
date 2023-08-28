import mongoose, { Schema, model } from 'mongoose';
import { IReview } from 'review';

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
      commentCount: {
        type: Number,
        default: function () {
          return this.comments.length;
        },
      },
      Likes : [
      {
        userId : {
            type : String,
        },
        isLike : {
            type : String,
            enum : ['yes', 'no'],
        },
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