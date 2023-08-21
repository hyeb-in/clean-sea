import mongoose, { Document, model, Schema } from 'mongoose';

interface IComment extends Document {
    postId : mongoose.Types.ObjectId;
    userId : mongoose.Types.ObjectId;
    content : string;
    userName : string;
    date : Date;
}

const commentSchema = new Schema<IComment>(
    {
        postId : {
            type : Schema.Types.ObjectId,
            ref : 'Post',
            required : true,
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true,
        },
        content : {
            type : String,
            required : true,
        },
        userName : {
            type : String,
            required : true,
        },
        date : {
            type : Date,
            required : true,
        },
    },
    {
        timestamps : true,
    },
);

const CommentModel = model<IComment>('comment', commentSchema);
export { CommentModel, IComment };