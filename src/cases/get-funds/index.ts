import "dotenv/config";
import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { FundData, Input } from "@/cases/get-funds/types";
import { FundServiceImpl } from "@/cases/get-funds/impl";
import { Fund } from "@/domain/fund";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  fundService: FundServiceImpl;
}

type FundUsecaseType = UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<FundData[] | Fund[]>
>;

// Crea un adaptador
const adapter =
  (fn: FundUsecaseType) =>
  async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Define el caso de uso de autenticación
export const fundCase: FundUsecaseType = async (
  params: Input,
  dependencies: Dependencies
) => {
  const { logger: log, fundService } = dependencies;

  try {
    const response = await fundService.get(params);
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

const getFundsCase = createApp(adapter(fundCase)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.fundService = new FundServiceImpl();
  }
);

export default getFundsCase;
