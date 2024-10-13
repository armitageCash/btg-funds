import {
  Subscription,
  subscriptionModel,
} from "@/infrastructure/persistence/mongoose/models/subscription";
import Repository from "@/shared/repository";

export class SubscriptionRepository extends Repository<Subscription> {
  constructor() {
    super(subscriptionModel);
  }

  createOne(data: Partial<Subscription>): Promise<Subscription> {
    return this.model.create(data);
  }
  updateOne(
    id: string,
    data: Partial<Subscription>
  ): Promise<Subscription | null> {
    return this.updateOne(id, data);
  }
}
