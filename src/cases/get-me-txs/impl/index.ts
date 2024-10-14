import { Input } from "@/cases/get-me-txs/types";
import transactionController from "@/controllers/transactionController";
import { Transaction } from "@/domain/transaction";
import TxsServiceManager from "@/cases/get-me-txs/manager";

export class TxsServiceImpl implements TxsServiceManager {
  get(params: Input): Promise<Transaction[] | undefined> {
    return new transactionController().getMeTxs(params);
  }
}
