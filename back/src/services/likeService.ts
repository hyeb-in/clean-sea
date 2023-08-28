import { ReviewModel } from '../db/schemas/reviewSchema';
import { BeachModel } from "../db/schemas/beachSchema";
enum TargetType {
    Beach = 'beach',
    Review = 'review',
}

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

async function updateLikeValue(targetType : TargetType, userId : string, targetId : string, isLike : string){
    try{
        if(targetType === TargetType.Beach){
            //추가예정
        }else if(targetType === TargetType.Review){
            const existingLike = await ReviewModel.findOne({ _id: targetId, 'Likes.userId': userId });

        if (existingLike) {
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