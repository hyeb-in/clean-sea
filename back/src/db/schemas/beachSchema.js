import { Schema, model } from "mongoose";

const BeachSchema = new Schema(
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

const BeachModel = model("Beach", BeachSchema);

export { BeachModel };