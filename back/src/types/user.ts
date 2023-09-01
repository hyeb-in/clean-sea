import { Request } from "express";

export interface IUser {
  toObject(): unknown;
  _id: string;
  name: string;
  email: string;
  password?: string;
  description: string;
  uploadFile?: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface IRequest extends Request {
  user: IUser;
  token: string;
}
