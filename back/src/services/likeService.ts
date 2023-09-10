import { ReviewModel } from '../db/schemas/reviewSchema';
import { BeachModel } from "../db/schemas/beachSchema";
enum TargetType {
    Beach = 'beach',
    Review = 'review',
}

// 좋아요 수 업데이트 함수
async function updateLikeCount(targetType : TargetType, targetId : string, change : number){
    try {
        const count = { _id : targetId };
        const update = { $inc : {likeCount : change }};

        if (targetType === TargetType.Beach){
            await BeachModel.updateOne(count, update);
        }else if(targetType === TargetType.Review){
            await ReviewModel.updateOne(count, update);
        }
    }catch(error){
        throw new Error(`Failed to update like count: ${error.message}`);
    }
}

// 좋아요 값 업데이트 함수
async function updateLikeValue(targetType : TargetType, userId : string, targetId : string, isLike : string){
    try{
        if(targetType === TargetType.Beach){
            //추가할시 : 해변 대상의 경우 추가 작업 필요
        }else if(targetType === TargetType.Review){
            // 리뷰 대상의 경우
            const existingLike = await ReviewModel.findOne({ _id: targetId, 'Likes.userId': userId });

        if (existingLike) {
            // 이미 좋아요를 눌렀던 경우, 좋아요를 취소
            const pullUpdate = {
                $pull: { Likes: { userId: userId } }
            };
            await ReviewModel.findOneAndUpdate({ _id: targetId }, pullUpdate);
            const newLike = {
                userId: userId,
                isLike: isLike
            };
            const pushUpdate = {
                $push: { Likes: newLike }
            };
            await ReviewModel.findOneAndUpdate({ _id: targetId }, pushUpdate);
        } else {
            // 좋아요를 처음 누른 경우
            const newLike = {
                userId: userId,
                isLike: isLike
            };
            const pushUpdate = {
                $push: { Likes: newLike }
            };
            await ReviewModel.findOneAndUpdate({ _id: targetId }, pushUpdate);
        }
        }
    }catch(error){
        throw new Error(`Failed to toggle like value: ${error.message}`);
    }
}

export { updateLikeCount, updateLikeValue };