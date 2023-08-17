import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    title: string;
    content: string;
    author?: string;
    fileUpload?: string;
}

const ReviewSchema : Schema<IReview> = new Schema({
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
    fileUpload : {
        type : String,
    },
    },

    {
        timestamps : true,
    }

);

const ReviewModel = model<IReview>('review', ReviewSchema);
export { ReviewModel, IReview };