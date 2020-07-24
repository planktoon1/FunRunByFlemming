import config from "../config";
import { scanDb } from "./api/services/db/scanDb";
import { Race, RaceState } from "./models/races";
import { pushDataFromSheetToDb } from "./api/services/pushDataFromSheetToDb";

const app = async () => {
  await pushDataFromSheetToDb();
};

app();

const getRacesFromDb = async () => {
  try {
    const scanRes = await scanDb({
      TableName: config.DBConfig.tableName,
      ScanFilter: {
        PK: {
          ComparisonOperator: "BEGINS_WITH",
          AttributeValueList: ["race_"],
        },
      },
    });

    if (!scanRes.Items) {
      throw new Error(`No races found :(`);
    }

    // process race data
    const races: Race[] = [];
    for (const race of scanRes.Items) {
      const raceDate = new Date(race.metaData.date);
      const now = new Date();
      races.push({
        title: race.metaData.title,
        date: race.metaData.date,
        description: race.metaData.description,
        place: race.metaData.place,
        host: race.metaData.host,
        distances: race.metaData.distances,
        state: raceDate > now ? RaceState.ToBeHeld : RaceState.HasBeenHeld,
        results: race.metaData.results,
      });
    }

    console.log(JSON.stringify(scanRes, null, 2));
    console.log(races);
  } catch (error) {
    console.error(error);
  }
};
