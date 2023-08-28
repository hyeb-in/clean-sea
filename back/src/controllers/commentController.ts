import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    addComment,
    getComment,
    setComment,
    deletedComment,
} from '../services/commentService';
import { ReviewModel } from '../db/schemas/reviewSchema';
import { CommentModel } from '../db/schemas/commetSchema';
import { IRequest } from "user";
  
const sendResponseWithData = function (res: Response, statusCode: number, data: any) {
    res.status(statusCode).json(data);
};

const createComment = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    try{
        const userId = req.user._id;
        const userName = req.user.name; 
        const postId = req.params.reviewId;

        const addMyComment = await addComment({
            toCreate : {...req.body, userId, userName, postId},
        });

        return sendResponseWithData(res,StatusCodes.CREATED, addMyComment);
    }catch(err){
        next(err);
    }
};

const getReviewComment = async (
    req : Request,
    res : Response,
    next : NextFunction,
 ) => {
    try {
        const getUserComment = await getComment(req.params.reviewId);

        return sendResponseWithData(res, StatusCodes.OK, getUserComment);
    }catch(err){
        next(err);
    }
}

const updateComment = async (
    req : Request,
    res : Response,
    next : NextFunction,
) => {
    try{
        const commentId = req.params.commentId;

        const updatedComment = await setComment(commentId, {
            toUpdate : { ...req.body },
        });

        return sendResponseWithData(res, StatusCodes.OK, updatedComment);
    }catch(err){
        next(err);
    }
};

const deleteComment = async(
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try{
        const deleteComment = await deletedComment(req.params.commentId);

        return sendResponseWithData(res, StatusCodes.OK, deleteComment);
    }catch(err){
        next(err);
    }
};

export { createComment, getReviewComment, updateComment, deleteComment };