import Joi from "joi";

export const FundSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  minAmount: Joi.number().required(),
  rate: Joi.number().min(0).max(10).required(),
});
