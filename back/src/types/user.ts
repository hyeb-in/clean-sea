import { Request } from "express";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  uploadFile?: string[];
}

export interface IRequest extends Request {
  user: IUser;
  token: string;
}
