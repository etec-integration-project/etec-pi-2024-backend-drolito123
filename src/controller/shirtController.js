import { Request, Response } from 'express';
import {pool} from '../database/index.js'

export const getShirts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM shirts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching shirts" });
  }
};

export const addShirt = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO shirts (name, description, price, imageUrl) VALUES (?, ?, ?, ?)",
        [name, description, price, imageUrl]
      );
  
      res.status(201).json({ id: result.insertId, name, description, price, imageUrl });
    } catch (error) {
      res.status(500).json({ error: "Error adding shirt" });
    }
  };