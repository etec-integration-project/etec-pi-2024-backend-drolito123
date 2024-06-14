import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'mysql_container',
  user: 'user',
  password: 'userpassword',
  database: 'shirtdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
