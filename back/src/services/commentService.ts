import { createComment, findReviewComment, updateComment, deleteComment } from '../db/models/Comment';
import { IComment } from '../types/comment';

async function addComment({toCreate} : {toCreate : IComment}): Promise <IComment>{
    const createdComment = await createComment(toCreate);
    return createdComment;
}

async function getComment(reviewId : string) : Promise<IComment[]>{
    const comment = await findReviewComment(reviewId);
    return comment;
}

async function setComment(commentId : string, {toUpdate} :{toUpdate : Partial<IComment>}) : Promise<IComment | null>{
    const updatedComment = updateComment(commentId, toUpdate);
    return updatedComment;
}

async function deletedComment(commentId : string) : Promise<IComment | null>{
    const deletedComment = await deleteComment(commentId);
    return deletedComment;
}

export { addComment, getComment, setComment, deletedComment };