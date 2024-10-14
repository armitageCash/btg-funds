export type Transaction = {
  _id: string; // Identificador único de la transacción (UUID)
  subscription: string; // ID de la suscripción relacionada (referencia)
  performance: number; // Rendimiento de la transacción
  date: Date; // Fecha de la transacción
  status: "Opened" | "Closed"; // Estado de la transacción
  type: "IN" | "OUT"; // Tipo de transacción (entrada o salida)
};
