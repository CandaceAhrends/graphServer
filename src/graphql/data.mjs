import {
  transform,
  transformDayVolume,
} from "../transformers/stockDetails.mjs";
import { getDayVolume, getAllDayVolume } from "../models/stockModel.mjs";

/***
 * MOCK UP DATA FOR THE POC
 */
export const getData = async () => {
  const date = "2023-01-09"; // just test data stuffed in here for learning graph only
  try {
    const result = await getDayVolume(date);
    return transform(result);
  } catch (error) {
    console.log(error);
  }
};

export const getAllDayVolumeData = async () => {
  try {
    const result = await getAllDayVolume();
    return transformDayVolume(result);
  } catch (error) {
    console.log(error);
  }
};
