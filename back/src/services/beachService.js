import { Beach } from "../db/models/Beach"; 

class beachService {
  // 가져오기
  static async getBeaches() {
    const beachData = await Beach.getBeaches();
    if (beachData.length === 0) {
      return [];
    }

    // 모든 이력을 배열로 변환
    const beachDataResult = beachData.map(beach => ({
      id: beach.id,
      name: beach.name,
      address: beach.address,
      latitude : beach.latitude,
      longtitude : beach.longtitude,
      goodnessFit : beach.goodnessFit,
      score : beach.score,
      ente : beach.ente,
      esch : beach.esch,
    }));

    return beachDataResult;
  }
}

export { beachService };