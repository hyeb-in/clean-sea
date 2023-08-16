import UserModel from "../schemas/userSchema";

export class User {
  static async findUserById(userId) {
    const user = await UserModel.findById(userId);
    return user;
  }

  static async findUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async create(email, name, hashedPassword) {
    const newUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return newUser;
  }
}
