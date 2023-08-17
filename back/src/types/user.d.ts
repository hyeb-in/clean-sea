import { Request } from "express";

export interface RequestTest extends Request {
  user: user;
  token: string;
  currentUserId? :string;
}

export type user = {
  _id: string;
  name: string;
  email: string;
  password: string;
};
