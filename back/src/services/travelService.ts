import { createTravel, findUserTravels,findUserTravel, updateTravel, deleteTravel } from '../db/models/Travel';
import { ITravel } from '../types/travel';

async function addTravel({toCreate} : {toCreate:ITravel}):Promise<ITravel>{
    const createdTravel = await createTravel(toCreate);
    return createdTravel;
}

async function getTravel(userId : string) :Promise<ITravel | null>{
    const review = await findUserTravel(userId);
    return review;
}

async function setTravel(travelId : string, {toUpdate} : {toUpdate : Partial<ITravel>}){
    await findUserTravels(travelId);

    const updatedTravel = updateTravel(travelId, toUpdate);
    
    return updatedTravel;
}

async function deletedTravel(travelId : string) : Promise<ITravel | null>{
    const deletedTravel = await deleteTravel(travelId);
    return deletedTravel;
}

export { addTravel, getTravel, setTravel, deletedTravel };