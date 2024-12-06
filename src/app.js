import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Para manejar cookies
import { initializeDatabase } from './database/index.js';
import router from './route/Route.js';
import jwt from 'jsonwebtoken'; // JWT para autenticación

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Cambia esto al dominio de tu frontend
  credentials: true, // Permitir cookies en las solicitudes
}));
app.use(express.json());
app.use(cookieParser());

// Middleware para autenticación persistente
const authenticateToken = (req, res, next) => {
  const token = req.cookies['pensado-app']; // Leer token de las cookies

  console.log(token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) return res.status(401).json({ message: 'No autenticado' });

  try {
    console.log(decoded);
    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {
    if (err) return res.status(403).json({ message: 'Token no válido' });
    req.user = user; // Guardar la información del usuario
    next();
  }
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
