import { createPool } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();


const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shirts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        imageUrl VARCHAR(255)
      );
    `);
    console.log("Database and tables initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export { pool };
