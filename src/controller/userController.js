import { pool } from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si ya existe el usuario o correo
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El usuario o el correo ya está en uso" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar en la base de datos
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ id: result.insertId, username, email });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Inicio de sesión de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const user = users[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('pensado-app', token);
    res.cookie('username', user.username, { httpOnly: false });

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('pensado-app');
  return res.json({ message: 'Sesión cerrada exitosamente' });
}