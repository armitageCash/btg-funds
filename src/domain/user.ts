import { Wallet } from "@/domain/wallet";

export interface User {
  _id: string; // Identificador único del usuario (puede ser un UUID)
  username: string; // Nombre de usuario
  firstName: string; // Primer nombre
  lastName: string; // Apellido
  email: string; // Correo electrónico
  password: string; // Contraseña (en producción, deberías manejar esto con seguridad)
  createdAt: Date; // Fecha de creación de la cuenta
  updatedAt: Date;
  wallet: Wallet;
  //wallet: Wallet; // Fecha de la última actualización
}
