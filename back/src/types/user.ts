import { Request } from "express";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  profileImage: string;
}

export interface IRequest extends Request {
  user: IUser;
  token: string;
}

// export type user = {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
// };
