import joi from "joi";

const emailReg: RegExp = new RegExp(
  "/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/"
);
const nameReg: RegExp = /^[a-zA-Z가-힣]$/;
const passwordReg: RegExp = /^[a-zA-Z0-9!@#;:'-_=+,./?]$/;

export const schema = joi.object().keys({
  name: joi.string().min(2).max(20).required().pattern(nameReg),
  email: joi.string().required().pattern(emailReg),
  password: joi.string().min(4).max(30).required().pattern(passwordReg),
});

export const signUpValidate = (
  naem: string,
  email: string,
  password: string
) => {
  const schema = joi.object().keys({
    name: joi.string().min(2).max(20).required().pattern(nameReg),
    email: joi.string().required().pattern(emailReg),
    password: joi.string().min(4).max(30).required().pattern(passwordReg),
  });
};
