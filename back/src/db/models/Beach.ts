import { BeachModel, IBeach } from "../schemas/beachSchema";
import { Types } from "mongoose";

async function BeachByBeachId(_id: Types.ObjectId): Promise<IBeach[]> {
  const getBeaches = await BeachModel.findOne({ _id : _id }) as IBeach[];
  return getBeaches;
}

async function BeachByRegion(address: string): Promise<IBeach[]> {
  const getBeaches = await BeachModel.find({ address : address}) as IBeach[];
  return getBeaches;
}

async function Beaches(): Promise<IBeach[]> {
  const getBeaches = await BeachModel.find({}) as IBeach[];
  return getBeaches;
}

export { BeachByBeachId, BeachByRegion, Beaches };