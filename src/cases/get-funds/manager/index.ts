import { Input } from "@/cases/get-funds/types";
import { Fund } from "@/domain/fund";
import { RootFilterQuery } from "mongoose";

export default interface fundServiceManager {
  add(params: Input): Promise<Fund | undefined>;
  get(params?: Input | RootFilterQuery<Fund>): Promise<Fund[] | undefined>;
}
