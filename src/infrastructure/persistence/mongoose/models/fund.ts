import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface Fund extends Document {
  _id: string;
  name: string;
  category: string;
  minAmount: number;
  rate: number;
}

const fundSchema = new Schema<Fund>({
  _id: {
    type: String,
    default: uuidv4,
  },
  category: { type: String, required: true },
  name: { type: String, required: true },
  minAmount: { type: Number, required: true },
  rate: { type: Number, required: true },
});

// Crear el modelo de Mongoose
export const fundModel = model<Fund>("Fund", fundSchema);
