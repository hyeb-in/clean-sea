import { Request, Response, NextFunction } from 'express';
import {
    addComment,
    getComment,
    setComment,
    deletedComment,
} from '../services/commentService';
import { IRequest } from "user";

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

        res.status(200).json(addMyComment);
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

        res.status(200).json(getUserComment);
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

        res.status(200).json(updatedComment);
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

        res.status(200).json(deleteComment);
    }catch(err){
        next(err);
    }
};

export { createComment, getReviewComment, updateComment, deleteComment };