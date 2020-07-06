import * as dbConfig from "./dbconfig.json";
import * as sheetsConfig from "./googlesheetsConfig.json";

// Attach dynamo tablename at runtime
const DBConfig = {
  ...dbConfig,
  tableName: dbConfig.properties.TableName.replace(
    "${self:provider.stage}",
    process.env.STAGE ? process.env.STAGE : "dev"
  ),
};

const config = {
  DBConfig,
  sheetsConfig,
};

export default config;
