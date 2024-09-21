import { createDbInsertLists } from "./loaders/generateDbInserts.mjs";
import { processInserts } from "./loaders/processDbInserts.mjs";

const dates = ["2024-02-15", "2024-02-21", "2024-02-22"];

const load = async () => {
  // use dates to get stock data and create data to insert into the database
  const lists = await createDbInsertLists(dates);

  await processInserts(lists);
  return 0;
};

await load();
