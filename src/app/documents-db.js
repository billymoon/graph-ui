import sqliter from "~/utils/sqliter";

export const { sqlExec, sqlSelect, sqlSelectOne } = sqliter({
  name: "docs-db",
  tables: {
    documents: {
      _id: "string primary key",
      _type: "string",
      data: "text",
    },
  },
});
