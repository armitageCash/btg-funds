import { Wallet } from "@/domain/wallet";
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
  wallet: Wallet; // Fecha de la última actualización
}

// Definición del esquema de Mongoose para User
const userSchema = new Schema<User>({
  _id: {
    type: String,
    default: uuidv4,
  },
  wallet: {
    type: String,
    required: true,
    ref: "Wallet",
  },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Crear el modelo de Mongoose
export const userModel = model<User>("User", userSchema);
