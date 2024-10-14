import { Document, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
// Definición de la interfaz Wallet
export interface Wallet extends Document {
  _id: string; // Identificador único de la wallet (UUID)
  balance: number; // Saldo de la wallet
}
// Definición del esquema de Mongoose para Wallet
const walletSchema = new Schema<Wallet>({
  _id: {
    type: String,
    default: uuidv4, // Generar un UUID por defecto
  },
  balance: {
    type: Number,
    default: 500000, // Saldo inicial por defecto
    required: true, // El saldo es obligatorio
  },
});

// Crear el modelo de Mongoose
export const walletModel = model<Wallet>("Wallet", walletSchema);
