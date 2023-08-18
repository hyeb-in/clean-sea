import { TravelModel } from '../schemas/travelSchema';
import { ITravel } from '../../types/travel';

async function createTravel(toCreate:ITravel) : Promise<ITravel>{
    const newTravel = await TravelModel.create(toCreate);
    return newTravel;
}

async function findUserTravels(userId: string) : Promise<ITravel[]>{
    const userTravels = await TravelModel.find({author : userId});
    return userTravels;
}

async function findUserTravel(travelId : string) : Promise<ITravel | null>{
    const travel = await TravelModel.findOne({author : travelId});
    return travel;
}

async function updateTravel(id : string, toUpdate : Partial<ITravel>) : Promise<ITravel | null>{
    const updatedTravel = await TravelModel.findOneAndUpdate(
        {_id : id},
        toUpdate,
        {returnOriginal : false}
    );
    return updatedTravel;
}

async function deleteTravel(travelId : string) : Promise<ITravel | null>{
    const deletedTravel = await TravelModel.findOneAndDelete({_id : travelId});
    return deletedTravel;
}

export { createTravel, findUserTravels,findUserTravel, updateTravel, deleteTravel};