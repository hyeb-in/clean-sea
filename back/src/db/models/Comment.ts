import { CommentModel } from "../schemas/commetSchema";
import { IComment } from "../../types/comment";

async function createComment(toCreate : IComment) : Promise<IComment>{
    const newComment = await CommentModel.create(toCreate);
    const newCommentObject = newComment.toObject();
    return newCommentObject as IComment;
}

async function findReviewComment(reviewId : string): Promise<IComment[]>{
    const comment = await CommentModel.find({postId : reviewId});
    return comment;
}

async function updateComment(commentId : string, toUpdate: Partial<IComment>): Promise<IComment | null>{
    const updatedComment = await CommentModel.findOneAndUpdate(
        {_id : commentId},
        toUpdate,
        { returnOriginal : false }
    );
    if(updatedComment){
        const updatedCommentObject = updatedComment.toObject();
        return updatedCommentObject as IComment;
    }
    return null;
}

async function deleteComment(commentId : string) : Promise<IComment | null>{
    const deletedComment = await CommentModel.findOneAndDelete({ _id : commentId});
    if (deletedComment) {
        const deletedCommentObject = deletedComment.toObject();
        return deletedCommentObject as IComment;
      }
      return null;
}

export { createComment, findReviewComment, updateComment, deleteComment };