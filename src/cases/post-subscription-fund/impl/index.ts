import SubscriptionServiceManager from "@/cases/post-subscription-fund/manager";
import { Input } from "@/cases/post-subscription-fund/types";
import SubscriptionController from "@/controllers/subscriptionController";
import { Subscription } from "@/domain/subscription";

export class SubscriptionServiceImpl implements SubscriptionServiceManager {
  create(params: Input): Promise<Subscription | undefined> {
    return new SubscriptionController().create(params);
  }
}
