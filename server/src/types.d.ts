import { ObjectId } from "mongoose";

export type User = {
  id: ObjectId;
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
};

export interface AuthenticatedUser extends JwtPayload {
  id: ObjectId;
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
}
