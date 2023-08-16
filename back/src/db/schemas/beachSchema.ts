import { Schema, model } from "mongoose";

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

const BeachSchema = new Schema<IBeach>(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    goodnessFit: {
      type: Boolean,
      required: false,
    },
    score: {
      type: Number,
      required: false,
    },
    ente: {
      type: Number,
      required: false,
    },
    esch: {
      type: Number,
      required: false,
    },
  }
);

const BeachModel = model<IBeach>("Beach", BeachSchema);
export { BeachModel, IBeach };
