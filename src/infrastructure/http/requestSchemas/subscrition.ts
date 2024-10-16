import Joi from "joi";

export const SubscriptionSchema = Joi.object({
  user: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .message("El usuario es requerido"), // Validación del objeto User
  fund: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .message("El fondo es requerido"), // Validación del objeto Fund
  amount: Joi.number().positive().required().message("El monto es requerido"), // Debe ser un número positivo
  createdAt: Joi.date().iso().optional(), // Opcional y debe ser una fecha en formato ISO
  updatedAt: Joi.date().iso().optional(), // Opcional y debe ser una fecha en formato ISO
  status: Joi.string()
    .valid("Opened", "Closed")
    .required()
    .message("el campo status es requerido"), // Solo permite los valores "Opened" o "Closed"
});
