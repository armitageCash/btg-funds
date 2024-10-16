import { Model, Document, RootFilterQuery } from "mongoose";

// Clase genérica Repository para cualquier modelo que extienda de Document
export default abstract class Repository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // Método para buscar múltiples documentos con un query
  async find(query: RootFilterQuery<T>): Promise<T[]> {
    return this.model.find(query || {});
  }

  // Método para buscar un solo documento por su ID
  async findOne(id: String) {
    return this.model.findById(id);
  }

  // Método para crear un documento
  async createOne(data: Partial<T>): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save();
  }

  // Método para actualizar un documento por su ID
  async updateOne(id: String, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Método para eliminar un documento por su ID
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
