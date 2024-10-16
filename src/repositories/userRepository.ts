import {
  User,
  userModel,
} from "@/infrastructure/persistence/mongoose/models/user";
import Repository from "@/shared/repository";
import { Document } from "mongoose";

export class UserRepository extends Repository<User> {
  constructor() {
    super(userModel);
  }

  findOne(id: String) {
    return this.model.findById(id);
  }
}
