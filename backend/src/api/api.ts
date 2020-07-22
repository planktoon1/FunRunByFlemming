import express, { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { scanDb } from "./services/db/scanDb";
import config from "../../config";

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
    return res.status(200).json(scanRes.Items);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
});

export default APIRouter;
