import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Para manejar cookies
import { initializeDatabase } from './database/index.js';
import router from './route/Route.js';
import jwt from 'jsonwebtoken'; // JWT para autenticación

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto al dominio de tu frontend
  credentials: true, // Permitir cookies en las solicitudes
}));
app.use(express.json());
app.use(cookieParser());

// Middleware para autenticación persistente
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken; // Leer token de las cookies
  if (!token) return res.status(401).json({ message: 'No autenticado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token no válido' });
    req.user = user; // Guardar la información del usuario
    next();
  });
};

// Rutas públicas
app.use('/api', router);

// Rutas protegidas (por ejemplo, para el carrito)
app.use('/api/protected', authenticateToken, router); // Puedes definir rutas privadas aquí

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Inicializar la base de datos al arrancar el servidor
  await initializeDatabase();
});
