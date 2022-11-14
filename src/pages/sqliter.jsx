import { Box, Button } from "@chakra-ui/react";
import { sqlExec, sqlSelect, sqlSelectOne } from "~/app/documents-db";

const Page = ({ query, variables, data: dataIn, profile }) => {
  return (
    <Box>
      <Button
        onClick={async () => {
          await sqlExec`insert into documents (_id, _type, data) values ("${Math.random()
            .toString()
            .slice(2)}", "component", "${JSON.stringify({ a: 1, b: 2 })}")`;
          const table = await sqlSelect`select * from documents`;
          console.table(table.slice(-5));
        }}
      >
        Do it
      </Button>
    </Box>
  );
};

export default Page;
