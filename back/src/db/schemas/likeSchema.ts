import { string } from "joi";
import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  model_type: {
    type: string,
    require: true,
  },
});
