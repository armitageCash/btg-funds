import fundServiceManager from "@/cases/get-funds/manager";
import { Input } from "@/cases/get-funds/types";
import FundController from "@/controllers/fundController";
import { Fund } from "@/domain/fund";
import { RootFilterQuery } from "mongoose";

export class FundServiceImpl implements fundServiceManager {
  add(params: Input): Promise<Fund | undefined> {
    throw new Error("Method not implemented.");
  }

  get(params?: Input | RootFilterQuery<Fund>): Promise<Fund[] | undefined> {
    return new FundController().getFunds(params);
  }
}
