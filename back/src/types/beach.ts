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
  globalScore?: number;
}

interface IRankedBeach extends IBeach {
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
  globalScore?: number;
  _doc:any;
}

type BeachDataAvg = {
  [year: string]: 
  { 
    eschAvgRelative: number,
    enteAvgRelative: number,
    avgRelativeScore: number
  }[];
};

  


export { IBeach, IRankedBeach, BeachDataAvg }