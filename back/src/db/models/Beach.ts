import { BeachModel, IBeach } from "../schemas/beachSchema";
import { Types } from "mongoose";
import { BeachData, BeachDataAvg } from "beach";

async function BeachByBeachName(name: string): Promise<IBeach | null> {
  const getBeaches = await BeachModel.findOne({ name: name });
  return getBeaches;
}

async function BeachByBeachId(_id: Types.ObjectId): Promise<IBeach[]> {
  const getBeaches = await BeachModel.findOne({ _id : _id }) as IBeach[];
  return getBeaches;
}

async function BeachByRegionAndYear(address: string, year: string): Promise<IBeach[]> {
  const getBeaches = await BeachModel.find({ address: address, year: year }) as IBeach[]; // 주소와 연도로 찾기
  return getBeaches;
}

async function BeachByRegionAndYearSpecificAvg(year: string): Promise<BeachDataAvg> {
  const query: any = { year: year };
  const getBeaches = await BeachModel.find(query) as IBeach[];
  const regions = ['강원', '경남', '경북', '인천', '울산', '부산', '전남', '전북', '제주', '충남'];

  const modifiedBeaches: BeachDataAvg = {
    [year]: []
  };

  for (const region of regions) {
    const matchingBeach = getBeaches.find(beach => beach.address === region);
    if (matchingBeach) {
      modifiedBeaches[year].push({
        eschAvgRelative: (matchingBeach.eschAvg && matchingBeach.enteAvg) ? Math.floor(matchingBeach.eschAvg / matchingBeach.eschGlobalAvg) : 0,
        enteAvgRelative: (matchingBeach.eschAvg && matchingBeach.enteAvg) ? Math.floor(matchingBeach.enteAvg / matchingBeach.enteGlobalAvg) : 0,
        avgRelativeScore : Math.floor(matchingBeach.eschAvg / matchingBeach.eschGlobalAvg) + Math.floor(matchingBeach.enteAvg / matchingBeach.enteGlobalAvg)
      });
    } else {
      modifiedBeaches[year].push({
        eschAvgRelative: 0,
        enteAvgRelative: 0,
        avgRelativeScore: 0
      });
    }
  }

  return modifiedBeaches;
}

async function BeachByRegionAndYearSpecific(year: string): Promise<BeachData> {
  const query: any = { year: year };
  const getBeaches = await BeachModel.find(query) as IBeach[];
  const regions = ['강원', '경남', '경북', '인천', '울산', '부산', '전남', '전북', '제주', '충남'];

  const modifiedBeaches: BeachData = {
    [year]: []
  };

  for (const region of regions) {
    const matchingBeach = getBeaches.find(beach => beach.address === region);
    if (matchingBeach) {
      modifiedBeaches[year].push({
        eschAvg: matchingBeach.eschAvg ? Math.floor(matchingBeach.eschAvg) : 0,
        enteAvg: matchingBeach.enteAvg ? Math.floor(matchingBeach.enteAvg) : 0
      });
    } else {
      modifiedBeaches[year].push({
        eschAvg: 0,
        enteAvg: 0
      });
    }
  }

  return modifiedBeaches;
}


async function Beaches(): Promise<IBeach[]> {
  const getBeaches = await BeachModel.find({}) as IBeach[];
  return getBeaches;
}

export { 
  BeachByBeachName,
  BeachByBeachId, 
  BeachByRegionAndYear, 
  BeachByRegionAndYearSpecificAvg, 
  BeachByRegionAndYearSpecific, 
  Beaches };
