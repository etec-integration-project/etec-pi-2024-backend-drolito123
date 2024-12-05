import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database/index.js';
import router from './route/Route.js'; // Nota: Asegúrate de que esta ruta exista

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Usar el router para las rutas API
app.use('/api', router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Inicializar la base de datos al arrancar el servidor
  await initializeDatabase();
});
