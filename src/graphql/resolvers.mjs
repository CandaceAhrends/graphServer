import StocksApi from "./stocksApi.mjs";

const stocksApi = new StocksApi();
await stocksApi.init();

export const resolvers = {
  Query: {
    availableStocks: () => stocksApi.getAvailableStocks(),
    availableDates: () => stocksApi.getAvailableDates(),
    details: () => stocksApi.getDetails(),
    volumeByDate: (parent, { date }, context) =>
      stocksApi.getDayVolumeStocks(date),
    detailsByTicker: (parent, { ticker }, context) =>
      stocksApi.getDetailsByTicker(ticker),
  },
};
