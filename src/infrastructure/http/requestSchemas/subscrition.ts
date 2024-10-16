import Joi from "joi";

export const SubscriptionSchema = Joi.object({
  user: Joi.string().guid({ version: ["uuidv4"] }), // Validación del objeto User
  fund: Joi.string().guid({ version: ["uuidv4"] }), // Validación del objeto Fund
  amount: Joi.number().positive().required(), // Debe ser un número positivo
  createdAt: Joi.date().iso().optional(), // Opcional y debe ser una fecha en formato ISO
  updatedAt: Joi.date().iso().optional(), // Opcional y debe ser una fecha en formato ISO
  status: Joi.string().valid("Opened", "Closed").required(), // Solo permite los valores "Opened" o "Closed"
});
