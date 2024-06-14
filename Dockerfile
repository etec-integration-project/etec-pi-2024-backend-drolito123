FROM node:20-alpine

# Actualizar apk y agregar bash y mysql-client
RUN apk update \
    && apk add bash \
    && apk add mysql-client

# Crear el directorio de trabajo y establecer permisos
RUN mkdir -p /app/node_modules \
    && chmod -R 777 /usr/local

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./
RUN chmod -R 777 /app

# Instalar las dependencias como usuario node
USER node

# Instalar npm, dependencias y mysql
RUN npm install -g npm \
    && npm install \
    && npm install mysql

# Copiar el código fuente
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "dist/app.js" ]
