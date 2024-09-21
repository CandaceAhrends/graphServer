import express from "express";
import { validateStockRequest } from "../middlewares/validation.mjs";
import { insertStock } from "../models/stockModel.mjs";

const router = express.Router();

// Endpoint to insert a stock symbol
router.post("/stock", validateStockRequest, async (req, res) => {
  const { symbol } = req.body;

  try {
    const result = await insertStock(symbol);
    res.status(201).json({ message: "Stock added successfully", result });
  } catch (error) {
    res.status(500).send("Error adding stock");
  }
});

export default router;
