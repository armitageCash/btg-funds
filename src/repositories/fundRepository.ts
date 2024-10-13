import {
  Fund,
  fundModel,
} from "@/infrastructure/persistence/mongoose/models/fund";
import Repository from "@/shared/repository";

export class FundRepository extends Repository<Fund> {
  constructor() {
    super(fundModel);
  }
}
