import { model, Schema } from 'mongoose';
import { IComment } from 'comment';

const commentSchema = new Schema<IComment>(
    {
        postId : {
            type : Schema.Types.ObjectId,
            ref : 'Review',
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
            default : Date.now,
        },
    },
    {
        timestamps : true,
    },
);

const CommentModel = model<IComment>('Comment', commentSchema);
export { CommentModel, IComment };