import { getData, getAllDayVolumeData } from "../graphql/data.mjs";

export default class StockApi {
  constructor() {
    this.data = null;
    this.allData = null;
  }
  async init() {
    try {
      this.data = await getData();
      this.data = this.data.map((d) => {
        // add random dummy data for POC
        return {
          ...d,
          stuff: [{ item: "a" }, { item: "b" }, { item: "c" }],
        };
      });
      this.allData = await getAllDayVolumeData();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  getDetails() {
    return this.data;
  }
  getDetailsByTicker(ticker) {
    return this.data.filter((d) => d.ticker === ticker);
  }
  getAvailableStocks() {
    return this.data.map((d) => ({ ticker: d.ticker }));
  }
  getDayVolumeStocks(date) {
    return this.allData.filter((d) => d.date === date);
  }
  getAvailableDates() {
    // could use a SQL query but this is just a POC and play
    const availableDates = [
      ...this.allData.reduce((acc, dayVol) => {
        acc.add(dayVol.date);
        return acc;
      }, new Set()),
    ].map((d) => ({ date: d }));

    return availableDates;
  }
}
