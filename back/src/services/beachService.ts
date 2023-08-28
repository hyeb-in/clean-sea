import { BeachByBeachId, BeachByRegionAndYear, BeachByRegionAndYearSpecificAvg, BeachByRegionAndYearSpecific, Beaches } from "../db/models/Beach";
import { Types } from "mongoose";
import { IBeach, BeachData, BeachDataAvg } from '../types/beach';

// 해수욕장 명칭 하나로 가져오기
async function getBeachByIdService(_id: Types.ObjectId): Promise<IBeach[]> {
  const beachDataOne = await BeachByBeachId(_id);
  return beachDataOne;
}

// 지역별 및 연도별 가져오기
async function getBeachByRegionAndYearService(address: string, year: string): Promise<IBeach[]> {
  const beachData = await BeachByRegionAndYear(address, year); // 주소와 연도를 함께 전달
  return beachData;
}

// 지역별 및 연도별 가져오기 및 추가조건, 상대값
async function getBeachByRegionAndYearSpecificServiceAvg(year: string): Promise<BeachDataAvg> {
  const beachData = await BeachByRegionAndYearSpecificAvg(year); // 주소와 연도를 함께 전달
  return beachData;
}


// 지역별 및 연도별 가져오기 및 추가조건
async function getBeachByRegionAndYearSpecificService(year: string): Promise<BeachData> {
  const beachData = await BeachByRegionAndYearSpecific(year); // 주소와 연도를 함께 전달
  return beachData;
}

// 전체 가져오기
async function getBeachesService(): Promise<IBeach[]> {
  const beachData = await Beaches();
  if (beachData.length === 0) {
    return [];
  }

  // 모든 이력을 배열로 변환
  const beachDataResult: IBeach[] = beachData.map(beach => ({
    _id: beach._id,
    name: beach.name,
    address: beach.address,
    goodnessFit: beach.goodnessFit,
    eschScore: beach.eschScore,
    enteScore: beach.enteScore,
    ente: beach.ente,
    esch: beach.esch,
    latitude: beach.latitude,
    longitude: beach.longitude,
  }));

  return beachDataResult;
}

export { getBeachByIdService, getBeachByRegionAndYearService, getBeachByRegionAndYearSpecificServiceAvg, getBeachByRegionAndYearSpecificService, getBeachesService };