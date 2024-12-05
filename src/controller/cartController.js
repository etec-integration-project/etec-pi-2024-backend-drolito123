import { pool } from '../index.js';

export const buyCart = async (req, res) => {
    
    const {cart, user_id} = req.body

    await pool.query('INSERT INTO cart (userID, cartContent) VALUES (?, ?)', [user_id, cart]);
    return res.json({msg:"Compra realizada"});

}