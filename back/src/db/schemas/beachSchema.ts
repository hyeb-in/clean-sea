import { Schema, model } from "mongoose";

interface IBeach {
  id: number;
  name: string;
  address: string;
  goodnessFit?: boolean;
  eschScore?: number,
  enteScore?: number,
  ente?: number;
  esch?: number;
  latitude?: number;
  longitude?: number;
  likes?: number;
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
    eschScore: {
      type: Number,
      required: false,
    },
    enteScore: {
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
    likes: {
      type: Number,
      required: false,
    }
  }
);

const BeachModel = model<IBeach>("Beach", BeachSchema);
export { BeachModel, IBeach };
