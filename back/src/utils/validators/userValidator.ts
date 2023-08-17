import joi from "joi";

export const signupSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(4),
});
