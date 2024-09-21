import express from "express";
import { validateGetDayVolumeRequest } from "../middlewares/validation.mjs";
import { getDayVolume } from "../models/stockModel.mjs";

const router = express.Router();

router.get("/dayvolume", validateGetDayVolumeRequest, async (req, res) => {
  const { date } = req.query;

  try {
    const result = await getDayVolume(date);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).send("Error adding day volumes");
  }
});

export default router;
