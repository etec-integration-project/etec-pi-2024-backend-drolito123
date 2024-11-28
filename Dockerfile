FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

EXPOSE 3001

# Arranca el servidor usando el archivo compilado
CMD ["node", "src/app.js"]

