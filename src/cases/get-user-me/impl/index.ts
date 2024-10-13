import meServiceManager from "@/cases/get-user-me/manager";
import { Input } from "@/cases/get-user-me/types";
import { User } from "@/domain/user";
import UserController from "@/controllers/userController";

export class MeServiceImpl implements meServiceManager {
  getUserInfo(params: Input): Promise<User | null> {
    return new UserController().getUser(params);
  }
}
