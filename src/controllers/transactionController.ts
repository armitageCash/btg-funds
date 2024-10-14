import { Input as InputTx } from "@/cases/get-me-txs/types";
import { Input } from "@/cases/get-funds/types";
import { Fund } from "@/domain/fund";
import { FundRepository } from "@/repositories/fundRepository";
import mongoose, { RootFilterQuery } from "mongoose";
import { Transaction } from "@/domain/transaction";
import { TransactionRepository } from "@/repositories/transactionRepository";

export default class TransactionController {
  transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async getMeTxs(params: InputTx): Promise<Transaction[] | undefined> {
    try {
      const filter: RootFilterQuery<Transaction> = {
        "subscription.user": { $eq: params._id },
      };
      const txs = await this.transactionRepository.find(filter);
      console.log(txs);

      return txs;
    } catch (error) {
      console.log("error getting funds", error);
    }
  }
}
