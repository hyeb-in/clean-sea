import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    title?: string;
    content?: string;
    userName? : string;
    location? : string;
    author?: string;
    uploadFile?: string;
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
        type : String,
    },
    },

    {
        timestamps : true,
    }

);

const ReviewModel = model<IReview>('review', ReviewSchema);
export { ReviewModel, IReview };