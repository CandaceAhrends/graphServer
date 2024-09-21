import pool from "../db/config.mjs";
import {
  dayVolumeQuery,
  insertDayVolumeQuery,
  insertDetailsQuery,
  allDayVolumeQuery,
} from "../sql/queries.mjs";

const ERROR_TEXT = "Error from db";
// Function to insert data into the stock table
export const insertStock = async (symbol) => {
  try {
    const [result] = await pool.query("INSERT INTO stock (symbol) VALUES (?)", [
      symbol,
    ]);
    return result;
  } catch (error) {
    console.error(ERROR_TEXT, error);
    throw error;
  }
};

export const insertStockDetails = async ({ symbol, details }) => {
  try {
    const [result] = await pool.query(insertDetailsQuery, [
      symbol,
      JSON.stringify(details),
    ]);
    return result;
  } catch (error) {
    console.error(ERROR_TEXT, error);
    throw error;
  }
};

export const insertDayVolume = async ({ symbol, date, volume }) => {
  try {
    const [result] = await pool.query(insertDayVolumeQuery, [
      symbol,
      volume,
      date,
    ]);
    return result;
  } catch (error) {
    console.error(ERROR_TEXT, error);
    throw error;
  }
};

export const getDayVolume = async (date) => {
  try {
    const [result] = await pool.query(dayVolumeQuery, [date]);
    return result;
  } catch (error) {
    console.error(ERROR_TEXT, error);
    throw error;
  }
};

export const getAllDayVolume = async () => {
  try {
    const [result] = await pool.query(allDayVolumeQuery);
    return result;
  } catch (error) {
    console.error(ERROR_TEXT, error);
    throw error;
  }
};
