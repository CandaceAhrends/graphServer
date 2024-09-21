import StockApi from "../src/graphql/stocksApi.mjs";

jest.mock("../src/graphql/data", () => {
  return {
    getAllDayVolumeData: () => {
      testing: 1;
    },
    getData: () => {
      return [
        {
          data: "testing",
          ticker: "TSLA",
        },
        {
          data: "not tsla",
          ticker: "AAPL",
        },
      ];
    },
  };
});

describe("StockApi", () => {
  it("should initialize and get the details", async () => {
    const stockApi = new StockApi();
    await stockApi.init();
    const details = stockApi.getDetails();

    expect(details[0].data).toEqual("testing");
  });
  it("should initialize and filter by ticker", async () => {
    const stockApi = new StockApi();
    await stockApi.init();
    const testResponse = stockApi.getDetailsByTicker("TSLA");
    expect(JSON.stringify(testResponse).indexOf("AAPL")).toEqual(-1);
  });
});
