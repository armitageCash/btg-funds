import {
  User,
  userModel,
} from "@/infrastructure/persistence/mongoose/models/user";
import Repository from "@/shared/repository";

export class UserRepository extends Repository<User> {
  constructor() {
    super(userModel);
  }
}
