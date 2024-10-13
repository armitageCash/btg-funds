import {
  Transaction,
  transactionModel,
} from "@/infrastructure/persistence/mongoose/models/transaction";
import Repository from "@/shared/repository";

export class TransactionRepository extends Repository<Transaction> {
  constructor() {
    super(transactionModel);
  }

  createOne(data: Partial<Transaction>): Promise<Transaction> {
    return this.model.create(data);
  }
}
