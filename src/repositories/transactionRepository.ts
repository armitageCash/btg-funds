import { fundModel } from "@/infrastructure/persistence/mongoose/models/fund";
import { subscriptionModel } from "@/infrastructure/persistence/mongoose/models/subscription";
import {
  Transaction,
  transactionModel,
} from "@/infrastructure/persistence/mongoose/models/transaction";
import { userModel } from "@/infrastructure/persistence/mongoose/models/user";
import Repository from "@/shared/repository";
import { RootFilterQuery } from "mongoose";

export class TransactionRepository extends Repository<Transaction> {
  constructor() {
    super(transactionModel);
  }

  createOne(data: Partial<Transaction>): Promise<Transaction> {
    return this.model.create(data);
  }

  find(query: RootFilterQuery<Transaction>): Promise<Transaction[]> {
    return this.model.find(query).populate([
      {
        path: "subscription", // Popula la relación de Subscription
        model: subscriptionModel,
        populate: [
          {
            path: "user", // Dentro de Subscription, popula la relación de User
            model: userModel,
          },
          {
            path: "fund", // Dentro de Subscription, popula la relación de Fund
            model: fundModel,
          },
        ],
      },
    ]);
  }
}
