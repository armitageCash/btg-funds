import { Logger } from "@/shared/logger";
import meServiceManager from "@/cases/get-user-me/manager";

export type Input = {
  _id: string;
};

export type meCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  meService: meServiceManager;
}
