import axios from "axios";
import { createUrlGetIterator } from "../src/helpers/urlIterator.mjs";

jest.mock("axios");

describe("CreateUrl GET Iterator", () => {
  it("should iterate urls", async () => {
    const mockData = { data: { results: { key: "value" } } };
    axios.get.mockResolvedValue(mockData);
    const urlList = [
      { url: "nothing", key: "nothing1" },
      { url: "nothing", key: "nothing2" },
    ];

    const testIterator = createUrlGetIterator(urlList);

    for await (const test of testIterator) {
      expect(test.results.key).toBeDefined();
    }
  }, 50000);
});
