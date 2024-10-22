import "dotenv/config";
import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { Input } from "@/cases/get-user-me/types";
import { MeServiceImpl } from "@/cases/get-user-me/impl";
import { User } from "@/domain/user";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  meService: MeServiceImpl;
}

type MeUsecaseType = UsecaseType<Input, Dependencies, UseCaseResult<User>>;

// Crea un adaptador
const adapter =
  (fn: MeUsecaseType) => async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Define el caso de uso de autenticación
export const MeUserCase: MeUsecaseType = async (
  params: Input,
  dependencies: Dependencies
) => {
  const { logger: log, meService } = dependencies;

  try {
    const response = await meService.getUserInfo(params);
    return {
      data: response || null,
      status: "success",
      message: "get me data succesfully.",
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: e.message,
      message: "Error getting me user .",
      status: "error",
    };
  }
};

const getUserMe = createApp(adapter(MeUserCase)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.meService = new MeServiceImpl();
  }
);

export default getUserMe;
