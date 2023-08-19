import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    title: string;
    content: string;
    name : string;
    location? : string;
    author?: string;
    uploadFile?: string;
}

const ReviewSchema : Schema<IReview> = new Schema({
    name : {
        type : String,
    },
    location : {
        type : String,
    },
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
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