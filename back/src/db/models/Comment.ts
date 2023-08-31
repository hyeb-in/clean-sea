import { CommentModel } from "../schemas/commetSchema";
import { ReviewModel } from "../schemas/reviewSchema";
import { IComment } from "../../types/comment";
import { errorGenerator } from "../../utils/errorGenerator";

async function createComment(toCreate : IComment) : Promise<IComment>{
    const { postId } = toCreate;

    const review = await ReviewModel.findById(postId);

    const newComment = await CommentModel.create(toCreate);
    const saveComment = await newComment.save();
    if(review){
        review.comments.push(saveComment._id);
        review.commentCount++;
        await review.save();
    }
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
    throw errorGenerator("해당 데이터가 존재하지않습니다.", 500);
}

async function deleteComment(commentId : string) : Promise<IComment | null>{
    const deletedComment = await CommentModel.findOneAndDelete({ _id : commentId});
    if (deletedComment) {
        const review = await ReviewModel.findById(deletedComment.postId);
        if (review) {
            const commentIndex = review.comments.findIndex(id => id.toString() === commentId);
            if (commentIndex !== -1) {
                review.comments.splice(commentIndex, 1);
                review.commentCount--;
                await review.save();
            }
        }
        const deletedCommentObject = deletedComment.toObject();
        return deletedCommentObject as IComment;
      }
    throw errorGenerator("해당 데이터가 존재하지않습니다.", 500);
}

export { createComment, findReviewComment, updateComment, deleteComment };