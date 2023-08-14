import { User } from "../db/models/User";
import bcrypt from "bcrypt";

export class userService {
  static async createUser(email, name, password) {
    const user = await User.findUserByEmail({ email });

    if (user) {
      res.status(400).send({ message: "이미 사용중인 이메일입니다." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create(email, name, hashedPassword);

    return createdUser;
  }
}
