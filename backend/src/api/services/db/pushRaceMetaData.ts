import AWS from "aws-sdk";
import config from "../../../../config";
import { InputRace } from "../../../models/races";
AWS.config.update({ region: "eu-central-1" });

const ddb = new AWS.DynamoDB.DocumentClient();

// Entry that controls whether or not a user is allowed to access the init page
export const pushRaceMetaData = async (metaData: InputRace) => {
  const PK = `race_${metaData.title}`;
  const now = `${new Date().toISOString()}`;

  const dbParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: config.DBConfig.tableName,
    Item: {
      PK,
      SK: `race_meta`,
      created: now,
      metaData,
    },
  };

  try {
    await ddb.put(dbParams).promise();
    console.log(
      `Successfully created  *Meta data* for: '${metaData.title}' to table: '${config.DBConfig.tableName}'`
    );
  } catch (err) {
    console.error(err);
  }
};
