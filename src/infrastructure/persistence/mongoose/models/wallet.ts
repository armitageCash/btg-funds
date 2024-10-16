import { Document, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
// Definición de la interfaz Wallet
export interface Wallet extends Document {
  _id: String; // Identificador único de la wallet (UUID)
  balance: number; // Saldo de la wallet
}
// Definición del esquema de Mongoose para Wallet
const walletSchema = new Schema<Wallet>({
  _id: {
    type: String,
    default: uuidv4,
  },
  balance: {
    type: Number,
  },
});

// Crear el modelo de Mongoose
export const walletModel = model<Wallet>("Wallet", walletSchema);
