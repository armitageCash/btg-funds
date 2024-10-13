import { Logger } from "@/shared/logger";
import { Subscription } from "@/infrastructure/persistence/mongoose/models/subscription";
import SubscriptionServiceManager from "@/cases/put-subscription-fund/manager";

export type Input = Pick<
  Subscription,
  "_id" | "user" | "fund" | "amount" | "status"
>;
export type SubscriptionData = Pick<
  Subscription,
  "_id" | "user" | "fund" | "amount" | "status"
>;

export type fundCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  subscriptionService: SubscriptionServiceManager;
}
