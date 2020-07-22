import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

export const scanDb = async function (
  scanParams: AWS.DynamoDB.DocumentClient.ScanInput
) {
  console.log(`DynamoDB: Scanning table: ´${scanParams.TableName}´`);
  console.debug({ scanParams });

  const scanResponse = await ddb.scan(scanParams).promise();
  if (scanResponse.LastEvaluatedKey) {
    console.log("DynamoDB: Scanning for more items...");
    scanParams.ExclusiveStartKey = scanResponse.LastEvaluatedKey;

    const moreScanResponse = await scanDb(scanParams);
    if (scanResponse.Items && moreScanResponse.Items) {
      scanResponse.Items = scanResponse.Items.concat(moreScanResponse.Items);
      (scanResponse.Count as number) += moreScanResponse.Count
        ? moreScanResponse.Count
        : 0;
      (scanResponse.ScannedCount as number) += moreScanResponse.ScannedCount
        ? moreScanResponse.ScannedCount
        : 0;
    }
  }
  if (scanResponse.ScannedCount && scanResponse.ScannedCount > 2000) {
    console.warn(
      `DynamoDB scanned: ${scanResponse.ScannedCount} items. Might want to optimize the access patterns to avoid big scans`
    );
  }
  return scanResponse;
};
