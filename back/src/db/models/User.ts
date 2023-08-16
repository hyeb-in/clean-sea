import UserModel from "../schemas/userSchema";

export class User {
  static async findUserById(userId: string) {
    const user = await UserModel.findById(userId);
    return user;
  }

  static async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async create(email: string, name: string, hashedPassword: string) {
    const newUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return newUser;
  }
}
