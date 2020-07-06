import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import config from "../../../../config";
import { DataImportError } from "../../../models/errors";
import { InputRace } from "../../../models/races";
const doc = new GoogleSpreadsheet(
  "1k1mSFrLWWHPAOt0rB0mU-V--ztfp15_RzhI99ywh6EY"
);

export const getAllRacesMetaData = async (): Promise<InputRace[]> => {
  await doc.useServiceAccountAuth(
    require("../../../../config/googlesheets-creds.json")
  );
  await doc.loadInfo(); // loads document properties and worksheets
  const sheets = doc.sheetsById;
  const raceCellMappings = config.sheetsConfig.cellMapping.races;
  const allRaces: InputRace[] = [];

  // loop through all sheets
  for (const sheetId in sheets) {
    const sheet = sheets[sheetId];
    // #### METADATA ####
    await sheet.loadCells("A1:F3");

    const title = getSheetValue(sheet, raceCellMappings.Title);
    const description = getSheetValue(sheet, raceCellMappings.Description);
    const host = getSheetValue(sheet, raceCellMappings.Host);
    const place = getSheetValue(sheet, raceCellMappings.Place);

    const distances = distanceStringToArray(
      getSheetValue(sheet, raceCellMappings.Distances)
    );
    const date = numberToDate(
      sheet.getCellByA1(raceCellMappings.Date).value
    ).toISOString();

    // #### RESULTS ####
    const results: any = {};
    await sheet.loadCells("A9:C1000");
    let currentRow = 9;
    let currentDistance: undefined | string = undefined;
    let reading = true;
    while (currentRow < 1000 && reading) {
      const distanceName = sheet.getCellByA1(`A${currentRow}`);
      if (typeof distanceName.value === "string" && distanceName.value !== "") {
        currentDistance = distanceName.value;
        console.log(`Reading results for distance: ${currentDistance}`);
        currentRow++;
        continue;
      } else if (!currentDistance) {
        currentRow++;
        continue;
      }
      const contestantName = sheet.getCellByA1(`B${currentRow}`).value;
      const contestantTime = sheet.getCellByA1(`C${currentRow}`).value;

      const resultEntry = {
        contestantName,
        contestantTime,
      };

      if (contestantName && contestantTime) {
        if (results[currentDistance]) {
          results[currentDistance].push(resultEntry);
        } else {
          results[currentDistance] = [resultEntry];
        }
      }

      currentRow++;
    }

    const raceObj = {
      title,
      description,
      distances,
      host,
      place,
      date,
      results,
    };
    allRaces.push(raceObj);
  }

  return allRaces;
};

function distanceStringToArray(distances: any) {
  if (typeof distances !== "string") {
    throw new DataImportError("Imported distances was not a string");
  }
  return distances.split(",");
}

function getSheetValue(sheet: GoogleSpreadsheetWorksheet, A1: string) {
  const val = sheet.getCellByA1(A1).value;
  if (typeof val === "string") {
    return val.replace(/\n/gi, "");
  }
  throw new DataImportError(`Imported ${A1} was not a string`);
}

function numberToDate(number) {
  // Weird workaround to get sheet date number to a js date
  var date = new Date(number * 24 * 60 * 60 * 1000);
  date.setFullYear(date.getFullYear() - 70);
  date.setDate(date.getDate() - 2);
  return date;
}
