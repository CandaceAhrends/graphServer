import express from "express";
import { validateDetailsRequest } from "../middlewares/validation.mjs";
import { insertStockDetails } from "../models/stockModel.mjs";

const router = express.Router();

router.post("/details", validateDetailsRequest, async (req, res) => {
  const { symbol, details } = req.body;

  try {
    const result = await insertStockDetails({ symbol, details });
    res
      .status(201)
      .json({ message: "Details were added successfully", result });
  } catch (error) {
    res.status(500).send("Error adding details");
  }
});

export default router;
