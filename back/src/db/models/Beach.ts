import { BeachModel, IBeach } from "../schemas/beachSchema";

async function BeachByBeachName(name: IBeach): Promise<IBeach[]> {
  const getBeaches = await BeachModel.findOne({ name : name }) as IBeach[];
  return getBeaches;
}

async function BeachByRegion(address: IBeach): Promise<IBeach[]> {
  const getBeaches = await BeachModel.find({ address : address}) as IBeach[];
  return getBeaches;
}

async function Beaches(): Promise<IBeach[]> {
  const getBeaches = await BeachModel.find({}) as IBeach[];
  return getBeaches;
}

export { BeachByBeachName, BeachByRegion, Beaches };