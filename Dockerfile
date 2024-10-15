# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app
# Define los argumentos que se pasarán durante la construcción
ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

RUN npm install pm2 -g
# Instala las dependencias del proyecto
RUN npm install

# Copia todo el contenido del proyecto al directorio de trabajo
COPY . .

# Expone el puerto 3000 que será utilizado por la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["pm2-runtime", "dist/src/infrastructure/http/server.js"]