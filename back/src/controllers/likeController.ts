import { Response, NextFunction } from "express";
import { ILike } from "likes";
import { LikeModel } from "../db/schemas/likeSchema";
import { IRequest } from "user";
import { updateLikeCount, updateLikeValue } from "../services/likeService";

// 좋아요 토글 처리함수
const toggleLike = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        const userId = req.user._id;
        const { targetType, targetId } = req.body;

        // 해당 사용자가 이미 좋아요를 눌렀는지 확인
        const existingLike : ILike | null = await LikeModel.findOne({userId, targetType, targetId });
        if(existingLike){
            // 이미 좋아요를 눌렀을 경우, 좋아요 취소 처리
            await existingLike.deleteOne({ _id : existingLike._id}); // 기존 좋아요 문서 삭제
            await updateLikeValue(targetType, userId, targetId,  "no"); // 해당 타겟의 좋아요 여부 업데이트
            await updateLikeCount(targetType, targetId, -1); // 해당 타겟의 좋아요 개수 감소

            return res.status(200).json({message : 'Like removed'});
        }else{
            // 아직 좋아요를 누르지 않았을 경우, 좋아요 처리
            const newLike = new LikeModel({ userId, targetType, targetId }); // 새로운 좋아요 문서 생성
            await newLike.save();
            await updateLikeValue(targetType, userId, targetId, "yes"); // 해당 타겟의 좋아요 여부 업데이트
            await updateLikeCount(targetType, targetId, 1); // 해당 타겟의 좋아요 개수 증가
            return res.status(200).json({message : 'Like added'});
        }
    }catch(err){
        next(err);
    }
}

export { toggleLike };