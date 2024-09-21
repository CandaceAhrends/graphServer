import { getDailyUrl, getDayVolumeUri, getStockUrick } from "../api/urls.mjs";
import { createUrlGetIterator } from "../helpers/urlIterator.mjs";

import { sortByVolume } from "../helpers/sort.mjs";

const LIMIT = 10;

export const createDbInsertLists = async (dates) => {
  const dailyUrls = dates.map((date) => ({
    url: getDailyUrl(date),
    key: date,
  }));
  let stockInsertUrls = [];
  let dayVolumeInsertUrls = [];

  const dailyIterator = createUrlGetIterator(dailyUrls);
  for await (const daily of dailyIterator) {
    const { key, results } = daily;
    const dailyList = results
      .map((d) => {
        return {
          volume: d.v,
          ticker: d.T,
          key,
        };
      })
      .sort(sortByVolume)
      .slice(0, LIMIT);

    stockInsertUrls = [
      ...stockInsertUrls,
      dailyList.map((daily) => {
        return {
          url: getStockUrick(),
          data: { symbol: daily.ticker },
          key,
        };
      }),
    ];

    dayVolumeInsertUrls = [
      ...dayVolumeInsertUrls,
      dailyList.map((daily) => {
        return {
          url: getDayVolumeUri(),
          data: {
            symbol: daily.ticker,
            volume: daily.volume,
            date: key,
          },
        };
      }),
    ];
  }

  return {
    stockInsertUrls: stockInsertUrls.flatMap((s) => s),
    dayVolumeInsertUrls: dayVolumeInsertUrls.flatMap((s) => s),
  };
};
