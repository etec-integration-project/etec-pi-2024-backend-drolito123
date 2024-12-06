import { createPool } from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Configuración de la conexión a la base de datos
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Inicialización de la base de datos
export const initializeDatabase = async () => {
  try {
    // Crear tabla "shirts"
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shirts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        imageUrl VARCHAR(255)
      );
    `);

    // Crear tabla "users"
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);
    await pool.query( `
      CREATE TABLE IF NOT EXISTS cart (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userID INT NOT NULL,
          cartContent VARCHAR(1024) NOT NULL
      );
  `);

    console.log("Database and tables initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export { pool };
