import { Schema, model, Document } from 'mongoose';
import { string } from 'yargs';

interface ITravel extends Document {
    author? : string;
    beachId : string;
    date : Date;
}

const TravelSchema : Schema<ITravel> = new Schema({
    author : {
        type : String,
    },
    beachId : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true,
    }

    },

    {
        timestamps : true,
    }

);

const TravelModel = model<ITravel>('travel', TravelSchema);
export { TravelModel, ITravel };