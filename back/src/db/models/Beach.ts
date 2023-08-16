import { BeachModel, IBeach } from "../schemas/beachSchema";

class Beach {
  static async getBeaches(): Promise<IBeach[]> {
    const getBeaches = await BeachModel.find({}) as IBeach[];
    return getBeaches;
  }
}

export { Beach };