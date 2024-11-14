import mysql, { RowDataPacket } from 'mysql2/promise';

// Configuración de la conexión a la base de datos
export const pool = mysql.createPool({
  host: 'mysql_container',
  user: 'user',
  password: 'userpassword',
  database: 'shirtdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Interface para el modelo Shirt
interface Shirt extends RowDataPacket {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  created_at: Date;
}

// Clase para gestionar la tabla `shirts`
class ShirtModel {
  constructor() {
    this.init();
  }

  // Método para crear la tabla si no existe, con reintentos
  async init(retries = 5, delay = 2000) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS shirts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(50),
        size VARCHAR(5),
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    for (let i = 0; i < retries; i++) {
      try {
        await pool.query(createTableQuery);
        console.log("Tabla 'shirts' verificada o creada exitosamente.");
        break; // Salir del bucle si se crea exitosamente
      } catch (error) {
        console.error(`Error al crear la tabla 'shirts':`, error);
        if (i < retries - 1) {
          console.log(`Reintentando en ${delay / 1000} segundos...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error("No se pudo crear la tabla después de varios intentos.");
        }
      }
    }
  }

  // Método para añadir una nueva remera
  async addShirt(name: string, color: string, size: string, price: number): Promise<number> {
    const insertQuery = 'INSERT INTO shirts (name, color, size, price) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(insertQuery, [name, color, size, price]);
    return (result as any).insertId;
  }

  // Método para obtener todas las remeras
  async getAllShirts(): Promise<Shirt[]> {
    const [rows] = await pool.query<Shirt[]>('SELECT * FROM shirts');
    return rows;
  }

  // Método para obtener una remera por ID
  async getShirtById(id: number): Promise<Shirt | null> {
    const [rows] = await pool.query<Shirt[]>('SELECT * FROM shirts WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  }
}

// Exporta una instancia de la clase para usarla en otras partes del código
export const shirtModel = new ShirtModel();
