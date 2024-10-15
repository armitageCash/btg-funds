# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY cts1ekpo1h56t2q
ENV PM2_SECRET_KEY oo0vcyac6bxutyb

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el contenido del proyecto al directorio de trabajo
COPY . .

# Expone el puerto 3000 que será utilizado por la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["pm2-runtime", "dist/src/infrastructure/http/server.js"]