import dayjs from "dayjs";
const DATE_FORMAT = "YYYY-MM-DD";

export const transform = (res) => {
  return res.map((r) => {
    return {
      ...r.details.results,
      date: r.txn_date,
      volume: r.volume,
    };
  });
};

export const transformDayVolume = (res) => {
  return res.map((r) => {
    return {
      ticker: r.symbol,
      date: dayjs(r.txn_date).format(DATE_FORMAT),
      volume: Number.parseFloat(r.volume),
    };
  });
};
