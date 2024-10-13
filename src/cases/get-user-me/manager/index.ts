import { Input } from "@/cases/get-user-me/types";
import { User } from "@/domain/user";
import { RootFilterQuery } from "mongoose";

export default interface meServiceManager {
  getUserInfo(params?: Input | RootFilterQuery<User>): Promise<User | null>;
}
