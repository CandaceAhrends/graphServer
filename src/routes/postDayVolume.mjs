import express from "express";
import { validateDayVolumeRequest } from "../middlewares/validation.mjs";
import { insertDayVolume } from "../models/stockModel.mjs";

const router = express.Router();

router.post("/dayvolume", validateDayVolumeRequest, async (req, res) => {
  const { symbol, date, volume } = req.body;

  try {
    const result = await insertDayVolume({
      symbol,
      date,
      volume,
    });
    res
      .status(201)
      .json({ message: "Day Volumes were added successfully", result });
  } catch (error) {
    res.status(500).send("Error adding day volumes");
  }
});

export default router;
