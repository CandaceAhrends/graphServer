import { createUrlPostDBIterator } from "../helpers/urlIterator.mjs";

export const processInserts = async ({
  stockInsertUrls,
  dayVolumeInsertUrls,
}) => {
  const stockInsertIterator = createUrlPostDBIterator(stockInsertUrls);
  for await (const iter of stockInsertIterator) {
    console.log("proccessing", iter);
  }
  const dayVolInsertIterator = createUrlPostDBIterator(dayVolumeInsertUrls);
  for await (const iter of dayVolInsertIterator) {
    console.log("proccessing", iter);
  }
};
