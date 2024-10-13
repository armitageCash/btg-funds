import { Input } from "@/cases/put-subscription-fund/types";
import { Subscription } from "@/domain/subscription";

export default interface SubscriptionServiceManager {
  update(params: Input): Promise<Subscription | undefined>;
}
