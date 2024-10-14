import "dotenv/config";
import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { Input } from "@/cases/get-me-txs/types";
import { TxsServiceImpl } from "@/cases/get-me-txs/impl";
import { Transaction } from "@/domain/transaction";
import { User } from "@/domain/user";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  txService: TxsServiceImpl;
}

type MeTxsUsecaseType = UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<Transaction[]>
>;

// Crea un adaptador
const adapter =
  (fn: MeTxsUsecaseType) =>
  async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Define el caso de uso de autenticación
export const meTxsCase: MeTxsUsecaseType = async (
  params: Input,
  dependencies: Dependencies
) => {
  const { logger: log, txService } = dependencies;

  try {
    const response = await txService.get(params);
    return {
      data: response || [],
      status: "success",
      message: "get data succesfully.",
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: e.message,
      message: "Error getting funds .",
      status: "error",
    };
  }
};

const getMeTxs = createApp(adapter(meTxsCase)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.txService = new TxsServiceImpl();
  }
);

export default getMeTxs;
