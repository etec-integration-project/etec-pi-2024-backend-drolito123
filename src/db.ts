import mysql, { RowDataPacket } from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'mysql_container',
  user: 'user',
  password: 'userpassword',
  database: 'shirtdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

interface Short extends RowDataPacket {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
}

interface Campera extends RowDataPacket {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
}

interface Shirt extends RowDataPacket {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
}

interface Cart extends RowDataPacket {
  id: number;
}

interface CartItem extends RowDataPacket {
  id: number;
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

// Funciones para Usuarios
export const createUser = async (username: string, password: string): Promise<number> => {
  const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  return (result as any).insertId;
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await pool.query<User[]>('SELECT * FROM users WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0] : null;
};

// Funciones para Shorts
export const getAllShorts = async (): Promise<Short[]> => {
  const [rows] = await pool.query<Short[]>('SELECT * FROM shorts');
  return rows;
};

export const getShortById = async (id: number): Promise<Short> => {
  const [rows] = await pool.query<Short[]>('SELECT * FROM shorts WHERE id = ?', [id]);
  return rows[0];
};

// Funciones para Camperas
export const getAllCamperas = async (): Promise<Campera[]> => {
  const [rows] = await pool.query<Campera[]>('SELECT * FROM camperas');
  return rows;
};

export const getCamperaById = async (id: number): Promise<Campera> => {
  const [rows] = await pool.query<Campera[]>('SELECT * FROM camperas WHERE id = ?', [id]);
  return rows[0];
};

// Funciones para Shirts
export const getAllShirts = async (): Promise<Shirt[]> => {
  const [rows] = await pool.query<Shirt[]>('SELECT * FROM shirts');
  return rows;
};

export const getShirtById = async (id: number): Promise<Shirt> => {
  const [rows] = await pool.query<Shirt[]>('SELECT * FROM shirts WHERE id = ?', [id]);
  return rows[0];
};

// Funciones para Carrito
export const createCart = async (): Promise<number> => {
  const [result] = await pool.query('INSERT INTO carts () VALUES ()');
  return (result as any).insertId;
};

export const getCartById = async (id: number): Promise<Cart> => {
  const [rows] = await pool.query<Cart[]>('SELECT * FROM carts WHERE id = ?', [id]);
  return rows[0];
};

export const getCartItemsByCartId = async (cartId: number): Promise<CartItem[]> => {
  const [rows] = await pool.query<CartItem[]>('SELECT * FROM cart_items WHERE cartId = ?', [cartId]);
  return rows;
};

export const addItemToCart = async (cartId: number, productId: number, productName: string, price: number, quantity: number): Promise<number> => {
  const [result] = await pool.query('INSERT INTO cart_items (cartId, productId, productName, price, quantity) VALUES (?, ?, ?, ?, ?)', [cartId, productId, productName, price, quantity]);
  return (result as any).insertId;
};
