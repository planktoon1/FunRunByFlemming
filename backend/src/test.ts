import { scanDb } from "./api/services/db/scanDb";

import config from "../config";

const app = async () => {
  const scanRes = await scanDb({
    TableName: config.DBConfig.tableName,
    ScanFilter: {
      PK: {
        ComparisonOperator: "BEGINS_WITH",
        AttributeValueList: ["race_"],
      },
    },
  });

  console.log(scanRes);
};
app();
