import express, { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { scanDb } from "./services/db/scanDb";
import config from "../../config";
import { Race, RaceState } from "../models/races";

const APIRouter = express.Router();

APIRouter.get("/test", async (req: Request, res: Response) => {
  const doc = new GoogleSpreadsheet(
    "1k1mSFrLWWHPAOt0rB0mU-V--ztfp15_RzhI99ywh6EY"
  );

  return res.status(200).json({ message: "Test from api" });
});

APIRouter.get("/races", async (req: Request, res: Response) => {
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

    return res.status(200).json(races);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
});

export default APIRouter;
