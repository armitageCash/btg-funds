import "dotenv/config";
import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { Input } from "@/cases/post-subscription-fund/types";
import { SubscriptionServiceImpl } from "@/cases/post-subscription-fund/impl";
import { Subscription } from "@/domain/subscription";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  subscriptionService: SubscriptionServiceImpl;
}

type FundCreateUsecaseType = UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<Subscription | undefined>
>;

// Crea un adaptador
const adapter =
  (fn: FundCreateUsecaseType) =>
  async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Define el caso de uso de autenticación
export const subscriptionCreateCase: FundCreateUsecaseType = async (
  params: Input,
  dependencies: Dependencies
) => {
  const { logger: log, subscriptionService } = dependencies;

  try {
    const data = await subscriptionService.create(params);
    log.info("subscriptionCreateCase: ", data);
    return {
      data: data,
      status: "success",
      message: "Create Subscription succesfully.",
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: e.message,
      message: "Error subscribing .",
      status: "error",
    };
  }
};

const postSubscription = createApp(adapter(subscriptionCreateCase)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.subscriptionService = new SubscriptionServiceImpl();
  }
);

export default postSubscription;
