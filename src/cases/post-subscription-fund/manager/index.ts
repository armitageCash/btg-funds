import { Input } from "@/cases/post-subscription-fund/types";
import { Fund } from "@/domain/fund";
import { Subscription } from "@/domain/subscription";
import { RootFilterQuery } from "mongoose";

export default interface SubscriptionServiceManager {
  create(params: Input): Promise<Subscription | undefined>;
}
