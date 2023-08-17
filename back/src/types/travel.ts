import { Document } from 'mongoose';

interface ITravel extends Document {
    author? : string;
    beachId : string;
    date : Date;
}

export { ITravel };