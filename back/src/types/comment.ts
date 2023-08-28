import mongoose, { Document } from 'mongoose';

interface IComment extends Document {
    postId : mongoose.Types.ObjectId;
    userId : mongoose.Types.ObjectId;
    content : string;
    userName : string;
    date? : Date;
}

export { IComment };