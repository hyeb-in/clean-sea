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
        throw error;
    }
}

async function updateLikeValue(targetType : TargetType, userId : string, isLike : string){
    try{
        const updated = {
            $set : {'Likes.$[elem].isLike' : isLike }
        };
        const arrayFilters = [{'elem.userId' : userId}];

        if(targetType === TargetType.Beach){
            //추가예정
        }else if(targetType === TargetType.Review){
            await ReviewModel.updateMany({},updated,{arrayFilters});
        }
    }catch(error){
        throw error;
    }
}

export { updateLikeCount, updateLikeValue };