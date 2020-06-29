import express, { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";

const APIRouter = express.Router();

APIRouter.get("/test", async (req: Request, res: Response) => {
  const doc = new GoogleSpreadsheet(
    "1k1mSFrLWWHPAOt0rB0mU-V--ztfp15_RzhI99ywh6EY"
  );

  return res.status(200).json({ message: "Test from api" });
});

export default APIRouter;
