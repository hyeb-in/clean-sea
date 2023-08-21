import { Schema, model } from "mongoose";
import { IUser } from "user";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "한 줄로 자신을 설명해주세요!",
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
