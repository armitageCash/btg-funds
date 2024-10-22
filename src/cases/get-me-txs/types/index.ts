import { Logger } from "@/shared/logger";
import fundServiceManager from "@/cases/get-funds/manager";
import { User } from "@/domain/user";

export type Input = Pick<User, "_id">;

export type fundCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  fundService: fundServiceManager;
}
