import { Request } from "express";

//TODO : created at, update at 이런 것도 넣어주기!
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
