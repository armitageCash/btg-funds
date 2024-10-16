import Joi from "joi";

export const UserSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .description("Identificador único del usuario (UUID)"),

  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .description("Nombre de usuario"),

  firstName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .description("Primer nombre del usuario"),

  lastName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .description("Apellido del usuario"),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .description("Correo electrónico válido"),

  password: Joi.string()
    .min(8)
    .required()
    .description("Contraseña del usuario (mínimo 8 caracteres)"),

  createdAt: Joi.date()
    .iso()
    .optional()
    .description("Fecha de creación de la cuenta"),

  updatedAt: Joi.date()
    .iso()
    .optional()
    .description("Fecha de la última actualización"),
}).meta({ className: "User" });
