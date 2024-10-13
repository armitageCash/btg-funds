import { Logger } from "@/shared/logger";
import fundServiceManager from "@/cases/get-funds/manager";
import { Fund } from "@/infrastructure/persistence/mongoose/models/fund";

export type Input = Pick<
  Fund,
  "_id" | "name" | "category" | "rate" | "minAmount"
>;
export type FundData = Pick<
  Fund,
  "_id" | "name" | "category" | "rate" | "minAmount"
>;

export type fundCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  fundService: fundServiceManager;
}
