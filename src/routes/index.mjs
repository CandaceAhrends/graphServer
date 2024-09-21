import { Router } from "express";
import stockRoutes from "./postStock.mjs";
import insertdetails from "./postDetails.mjs";
import insertDayVolume from "./postDayVolume.mjs";
import getDayVolume from "./getDayVolume.mjs";

const router = Router();
const basePath = "";
router.use(basePath, stockRoutes);
router.use(basePath, insertdetails);
router.use(basePath, insertDayVolume);
router.use(basePath, getDayVolume);

export default router;
