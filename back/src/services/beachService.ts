import { Beach } from "../db/models/Beach";

interface IBeach {
  id: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  goodnessFit?: boolean;
  score?: number;
  ente?: number;
  esch?: number;
}

class BeachService {
  // 가져오기
  static async getBeaches(): Promise<IBeach[]> {
    const beachData = await Beach.getBeaches();
    if (beachData.length === 0) {
      return [];
    }

    // 모든 이력을 배열로 변환
    const beachDataResult: IBeach[] = beachData.map(beach => ({
      id: beach.id,
      name: beach.name,
      address: beach.address,
      latitude: beach.latitude,
      longitude: beach.longitude,
      goodnessFit: beach.goodnessFit,
      score: beach.score,
      ente: beach.ente,
      esch: beach.esch,
    }));

    return beachDataResult;
  }
}

export { BeachService };
