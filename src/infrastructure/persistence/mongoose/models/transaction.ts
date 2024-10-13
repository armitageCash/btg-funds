import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Document } from "mongoose";

// Definición de la interfaz Transaction
export interface Transaction extends Document {
  _id: string; // Identificador único de la transacción (UUID)
  subscription: string; // ID de la suscripción relacionada (referencia)
  performance: number; // Rendimiento de la transacción
  date: Date; // Fecha de la transacción
  status: "Opened" | "Closed"; // Estado de la transacción
  type: "IN" | "OUT"; // Tipo de transacción (entrada o salida)
}
// Definición del esquema de Mongoose para Transaction
const transactionSchema = new Schema<Transaction>({
  _id: {
    type: String,
    default: uuidv4, // Generar un UUID por defecto
  },
  subscription: {
    type: String,
    required: true, // ID de la suscripción
    ref: "Subscription", // Referencia al modelo Subscription
  },
  performance: {
    type: Number,
    required: true, // Rendimiento de la transacción
  },
  date: {
    type: Date,
    default: Date.now, // Fecha actual por defecto
    required: true, // La fecha es obligatoria
  },
  status: {
    type: String,
    enum: ["Completed", "Pending"], // Estados permitidos
    required: true, // El estado es obligatorio
  },
  type: {
    type: String,
    enum: ["IN", "OUT"], // Tipos permitidos
    required: true, // El tipo es obligatorio
  },
});

// Crear el modelo de Mongoose
export const transactionModel = model<Transaction>(
  "Transaction",
  transactionSchema
);
