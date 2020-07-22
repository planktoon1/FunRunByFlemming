import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

export const queryDb = async function (
  queryParams: AWS.DynamoDB.DocumentClient.QueryInput
) {
  console.log(`DynamoDB: Queryning table: ´${queryParams.TableName}´`);
  console.debug({ queryParams });

  const queryResponse = await ddb.query(queryParams).promise();
  if (queryResponse.LastEvaluatedKey) {
    console.log("DynamoDB: Queryning for more items...");
    queryParams.ExclusiveStartKey = queryResponse.LastEvaluatedKey;

    const moreQueryResponse = await queryDb(queryParams);
    if (queryResponse.Items && moreQueryResponse.Items) {
      queryResponse.Items = queryResponse.Items.concat(moreQueryResponse.Items);
      (queryResponse.Count as number) += moreQueryResponse.Count
        ? moreQueryResponse.Count
        : 0;
      (queryResponse.ScannedCount as number) += moreQueryResponse.ScannedCount
        ? moreQueryResponse.ScannedCount
        : 0;
    }
  }
  if (queryResponse.ScannedCount && queryResponse.ScannedCount > 2000) {
    console.warn(
      `DynamoDB queried: ${queryResponse.ScannedCount} items. Might want to optimize the access patterns to avoid big queries`
    );
  }
  return queryResponse;
};
