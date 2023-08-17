import bcrypt from "bcrypt";
import { createNewUser, findUserByEmail } from "../db/models/User";

/**
 * @param {*} email
 * @param {*} name
 * @param {*} password
 * @returns createdUser
 * @description 유저 존재하는지 체크한 후 유저 생성
 */
export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("이미 존재하는 이메일입니다.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await createNewUser(email, name, hashedPassword);

  return createdUser;
};
// export class userService {
//   /**
//    * @param {*} email
//    * @param {*} name
//    * @param {*} password
//    * @returns createdUser
//    * @description 유저 존재하는지 체크한 후 유저 생성
//    */
//   static async createUser(email: string, name: string, password: string) {
//     const user = await User.findUserByEmail(email);

//     if (user) {
//       throw new Error("이미 존재하는 이메일입니다.");
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const createdUser = await User.create(email, name, hashedPassword);

//     return createdUser;
//   }
// }
