import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Definición de la interfaz User
export interface User extends Document {
  _id: string; // Identificador único del usuario (UUID)
  username: string; // Nombre de usuario
  firstName: string; // Primer nombre
  lastName: string; // Apellido
  email: string; // Correo electrónico
  password: string; // Contraseña
  createdAt: Date; // Fecha de creación de la cuenta
  updatedAt: Date;
  wallet: string; // Fecha de la última actualización
}

// Definición del esquema de Mongoose para User
const userSchema = new Schema<User>({
  _id: {
    type: String,
    default: uuidv4, // Generar un UUID por defecto
  },
  wallet: {
    type: String,
    required: true, // ID de la suscripción
    ref: "wallet", // Referencia al modelo Subscription
  },
  username: { type: String, required: true, unique: true }, // Nombre de usuario único
  firstName: { type: String, required: true }, // Primer nombre
  lastName: { type: String, required: true }, // Apellido
  email: { type: String, required: true, unique: true }, // Correo electrónico único
  password: { type: String, required: true }, // Contraseña
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
  updatedAt: { type: Date, default: Date.now }, // Fecha de actualización
});

// Crear el modelo de Mongoose
export const userModel = model<User>("User", userSchema);
