import { Schema, model, Types } from "mongoose";

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

const BeachSchema = new Schema<IBeach>(
  {
    year: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ente: {
      type: Number,
      required: false,
    },
    esch: {
      type: Number,
      required: false,
    },
    goodnessFit: {
      type: Boolean,
      required: false,
    },
    eschAvg: {
      type: Number,
      required: false,
    },
    enteAvg: {
      type: Number,
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
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BeachModel = model<IBeach>("Beach", BeachSchema);
export { BeachModel, IBeach };