import { BeachModel } from "./Beach";

class Beach {
  static async createBeach(newBeach) {
    const createdNewBeach = await BeachModel.create(newBeach);
    return createdNewBeach;
  }

  static async removeBeach(oldBeach) {
    const filter = { _id: oldBeach };
    const deletedBeach = await BeachModel.findOneAndDelete(filter);
    return deletedBeach;
  }

  static async getBeaches() {
    const getBeaches = await BeachModel.find({});
    return getBeaches;
  }
}

export { Beach };