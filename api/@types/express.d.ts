import { User } from "../models/User";

export {};

declare global {
  namespace Express {
    export interface Request {
      authUser?: User["_id"];
    }
  }
}
