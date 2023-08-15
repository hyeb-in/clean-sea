import { userService } from "../services/userService";

/**
 * @param {*} req name,email,password
 * @description 회원가입 api
 */
export const signUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: "모든 사항을 입력하세요" });
    }

    const newUser = await userService.createUser(email, name, password);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    next(error);
  }
};
