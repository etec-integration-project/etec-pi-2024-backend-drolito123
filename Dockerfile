# Usa una versión ligera de Node.js
FROM node:20-alpine

# Crear el directorio de trabajo y establecer permisos
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias como root
RUN npm install \
    && npm install mysql

# Cambiar al usuario node para mayor seguridad
USER node

# Copiar el código fuente de la aplicación
COPY --chown=node:node . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/app.js"]
