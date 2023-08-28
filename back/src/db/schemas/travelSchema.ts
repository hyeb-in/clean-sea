import { Schema, model } from 'mongoose';
import { ITravel } from 'travel';

const TravelSchema : Schema<ITravel> = new Schema({
    author : {
        type : String,
        required : true,
    },
    beachId : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true,
    },

    },

    {
        timestamps : true,
    }

);

const TravelModel = model<ITravel>('travel', TravelSchema);
export { TravelModel, ITravel };