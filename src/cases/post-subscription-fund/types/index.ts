import { Logger } from "@/shared/logger";
import fundServiceManager from "@/cases/post-subscription-fund/manager";
import { Subscription } from "@/infrastructure/persistence/mongoose/models/subscription";

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
  fundService: fundServiceManager;
}
