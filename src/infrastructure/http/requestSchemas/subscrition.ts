import Joi from "joi";

export const SubscriptionSchema = Joi.object({
  user: Joi.string()
    .guid({ version: ["uuidv3"] })
    .required()
    .messages({
      "string.guid": "El usuario debe ser un uuid válido",
      "any.required": "El usuario es requerido",
    }), // Validación del objeto User
  fund: Joi.string()
    .guid({ version: ["uuidv3"] })
    .required()
    .messages({
      "string.guid": "El fondo debe ser un uuid válido",
      "any.required": "El fondo es requerido",
    }), // Validación del objeto Fund
  amount: Joi.number().positive().required().messages({
    "number.base": "El monto debe ser un número",
    "number.positive": "El monto debe ser positivo",
    "any.required": "El monto es requerido",
  }), // Debe ser un número positivo
  createdAt: Joi.date().iso().optional().messages({
    "date.iso": "La fecha de creación debe estar en formato ISO",
  }), // Opcional y debe ser una fecha en formato ISO
  updatedAt: Joi.date().iso().optional().messages({
    "date.iso": "La fecha de actualización debe estar en formato ISO",
  }), // Opcional y debe ser una fecha en formato ISO
  status: Joi.string().valid("Opened", "Closed").required().messages({
    "any.only": "El estado solo puede ser 'Opened' o 'Closed'",
    "any.required": "El campo status es requerido",
  }), // Solo permite los valores "Opened" o "Closed"
});
