//format 2023-01-09
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.POLYGON_APIKEY;

export const getDailyUrl = (date) =>
  `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&include_otc=false&apiKey=${APIKEY}`;

export const getTickerDetailsUri = (ticker) =>
  `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${APIKEY}`;

export const getStockUri = () => `http://localhost:7070/api/v1/insertstock`;
export const getDayVolumeUri = () =>
  `http://localhost:7070/api/v1/insertdayvolume`;
