import { GoogleSpreadsheet } from "google-spreadsheet";
const doc = new GoogleSpreadsheet(
  "1k1mSFrLWWHPAOt0rB0mU-V--ztfp15_RzhI99ywh6EY"
);

const app = async () => {
  await doc.useServiceAccountAuth(require("../config/googlesheets-creds.json"));
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
};
app();
