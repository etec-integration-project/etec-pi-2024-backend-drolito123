import {pool} from '../database/index.js'

export const buyCart = async (req, res) => {
    console.log(req.body.cart);

    const cart = req.body.cart;
    const user_id = req.user.id;

    await pool.query('INSERT INTO cart (userID, cartContent) VALUES (?, ?)', [user_id, cart]);
    return res.json({message:"Compra realizada"});

}