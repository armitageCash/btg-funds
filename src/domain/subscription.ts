import { Fund } from "./fund";
import { User } from "./user";

export interface Subscription {
  _id: string;
  user: string;
  fund: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  status: "Opened" | "Closed";
}

export interface SubscriptionDetailed {
  _id: String;
  user: User;
  fund: Fund;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  status: "Opened" | "Closed";
}

export interface SubscriptionEmailData {
  user: string;
  fund: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  status: "Opened" | "Closed";
}
