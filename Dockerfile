FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala TypeScript globalmente
RUN npm install -g typescript

# Copia el resto del código fuente
COPY . .

# Compila TypeScript
RUN tsc

# Arranca el servidor usando el archivo compilado
CMD ["node", "dist/app.js"]
