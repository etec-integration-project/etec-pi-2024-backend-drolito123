# Usa una imagen base de Node.js
FROM node:20-alpine

# Crear el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install && npm install mysql

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación usando ts-node
CMD ["npx", "ts-node", "src/app.ts"]
