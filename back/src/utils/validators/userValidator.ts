import joi from "joi";

const emailReg = "";
const nameReg = "";

export const signupSchema = joi.object().keys({
  name: joi.string().min(2).required(),
  email: joi.string().required(),
  password: joi.string().min(4),
});
