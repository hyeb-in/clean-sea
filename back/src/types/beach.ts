import { Types } from "mongoose";

interface IBeach {
  year?: number;
  _id?: Types.ObjectId;
  address: string;
  name: string;
  ente?: number;
  esch?: number;
  goodnessFit?: boolean;
  eschAvg?: number;
  enteAvg?: number;
  eschScore?: number;
  enteScore?: number;
  latitude?: number;
  longitude?: number;
}

interface BeachData {
  [year: string]: 
  { 
    eschAvg: number, 
    enteAvg: number 
  }[];
}

type BeachDataAvg = {
  [year: string]: 
  { 
    eschAvgRelative: number,
    enteAvgRelative: number,
    avgRelativeScore: number
  }[];
};

  


export { IBeach, BeachData, BeachDataAvg }