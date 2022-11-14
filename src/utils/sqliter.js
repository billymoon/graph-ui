import { SQLiteWorker } from "sqlite-worker/tables";

const sqliter = (config) => {
  // if executed server side, return empty object
  if (typeof window === "undefined") return {};

  const SQLiteWorkerPromise = SQLiteWorker({
    dist: "/sqlite-worker",
    name: "sqliter",
    ...config,
  });

  const getSQLiteWorker =
    (which) =>
    async (arr, ...args) => {
      const { raw, ...methods } = await SQLiteWorkerPromise;
      const mapper = (arg) => raw`${arg.replaceAll('"', '""')}`;
      return await methods[which](arr, ...args.map(mapper));
    };

  return {
    sqlExec: getSQLiteWorker("query"),
    sqlSelect: getSQLiteWorker("all"),
    sqlSelectOne: getSQLiteWorker("get"),
  };
};

export default sqliter;
