import { ReviewModel } from '../db/schemas/reviewSchema';
import { BeachModel } from "../db/schemas/beachSchema";
enum TargetType {
    Beach = 'beach',
    Review = 'review',
}

async function updateLikeCount(targetType : TargetType, targetId : string, change : number){
    try {
        const condition = { _id : targetId };
        const update = { $inc : {likeCount : change }};

        if (targetType === TargetType.Beach){
            await BeachModel.updateOne(condition, update);
        }else if(targetType === TargetType.Review){
            await ReviewModel.updateOne(condition, update);
        }
    }catch(error){
        throw error;
    }
}

export { updateLikeCount };