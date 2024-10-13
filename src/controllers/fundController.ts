import { Input as InputCreate } from "@/cases/post-subscription-fund/types";
import { Input } from "@/cases/get-funds/types";
import { Fund } from "@/domain/fund";
import { FundRepository } from "@/repositories/fundRepository";
import { RootFilterQuery } from "mongoose";

export default class FundController {
  fundRepository: FundRepository;

  constructor() {
    this.fundRepository = new FundRepository();
  }

  async getFunds(query?: RootFilterQuery<Fund>): Promise<Fund[] | undefined> {
    try {
      const funds = await this.fundRepository.find({});
      return funds;
    } catch (error) {
      console.log("error getting funds", error);
    }
  }

  async getFund(params: Input): Promise<Fund[] | undefined> {
    try {
      const funds = await this.fundRepository.find({
        id: params._id,
      });
      return funds;
    } catch (error) {
      console.log("error getting funds", error);
    }
  }
  async add(params: Input): Promise<Fund | undefined> {
    try {
      const fund = await this.fundRepository.createOne(params);
      return fund;
    } catch (error) {
      console.log("error creating funds", error);
    }
  }
}
