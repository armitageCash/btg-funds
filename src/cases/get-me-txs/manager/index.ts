import { Input } from "@/cases/get-me-txs/types";
import { Transaction } from "@/domain/transaction";
import { RootFilterQuery } from "mongoose";

export default interface TxsServiceManager {
  get(params?: Input): Promise<Transaction[] | undefined>;
}
