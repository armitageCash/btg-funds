import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Definición de la interfaz Subscription
export interface Subscription extends Document {
  _id: string; // Identificador único de la suscripción (UUID)
  user: string; // Usuario relacionado con la suscripción
  fund: string; // Fondo relacionado con la suscripción
  amount: number; // Monto de la suscripción
  createdAt: Date; // Fecha de creación de la suscripción
  updatedAt: Date; // Fecha de actualización de la suscripción
  status: "Opened" | "Closed"; // Estado de la suscripción
}

// Definición del esquema de Mongoose para Subscription
const subscriptionSchema = new Schema<Subscription>({
  _id: {
    type: String,
    default: uuidv4, // Generar un UUID por defecto
  },
  user: {
    type: String,
    ref: "User", // Referencia al modelo User
    required: true,
  },
  fund: {
    type: String,
    ref: "Fund", // Referencia al modelo Fund
    required: true,
  },
  amount: { type: Number, required: true }, // Monto de la suscripción
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
  updatedAt: { type: Date, default: Date.now }, // Fecha de actualización
  status: { type: String, enum: ["Opened", "Closed"], required: true }, // Estado de la suscripción
});

// Crear el modelo de Mongoose
export const subscriptionModel = model<Subscription>(
  "Subscription",
  subscriptionSchema
);
