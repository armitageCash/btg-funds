export type Category = "FPV" | "FIC";

export type Fund = {
  _id: string;
  name: string;
  category: string;
  minAmount: number;
  rate: number;
};
