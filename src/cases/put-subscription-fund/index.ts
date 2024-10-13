import "dotenv/config";
import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { Input } from "@/cases/put-subscription-fund/types";
import { SubscriptionServiceImpl } from "@/cases/put-subscription-fund/impl";
import { Subscription } from "@/domain/subscription";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  subscriptionService: SubscriptionServiceImpl;
}

type FundUpdateUsecaseType = UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<Subscription | undefined>
>;

// Crea un adaptador
const adapter =
  (fn: FundUpdateUsecaseType) =>
  async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Define el caso de uso de autenticación
export const subscriptionUpdateCase: FundUpdateUsecaseType = async (
  params: Input,
  dependencies: Dependencies
) => {
  const { logger: log, subscriptionService } = dependencies;

  try {
    const data = await subscriptionService.update(params);
    log.info("subscriptionUpdateCase: ", data);
    return {
      data: data,
      status: "success",
      message: "Updated Subscription succesfully.",
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: e.message,
      message: "Error updating.",
      status: "error",
    };
  }
};

const putSubscription = createApp(adapter(subscriptionUpdateCase)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.subscriptionService = new SubscriptionServiceImpl();
  }
);

export default putSubscription;
