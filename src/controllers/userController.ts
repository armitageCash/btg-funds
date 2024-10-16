import { Input } from "@/cases/get-user-me/types";
import { RootFilterQuery } from "mongoose";
import { UserRepository } from "@/repositories/userRepository";
import { User } from "@/domain/user";
import { walletModel } from "@/infrastructure/persistence/mongoose/models/wallet";

export default class UserController {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers(query?: RootFilterQuery<User>): Promise<User[] | undefined> {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
      console.log("error getting User", error);
    }
  }

  async getUser(params: Input): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne(params._id).populate([
        {
          path: "wallet",
          model: walletModel,
        },
      ]);

      return user;
    } catch (error) {
      console.log("error getting User", error);
      return null;
    }
  }

  async add(params: Input): Promise<User | undefined> {
    try {
      const user = await this.userRepository.createOne(params);
      return user;
    } catch (error) {
      console.log("error creating User", error);
    }
  }
}
