import { getAllRacesMetaData } from "./sheets/getAllRacesMetaData";
import { pushRaceMetaData } from "./db/pushRaceMetaData";

export const pushDataFromSheetToDb = async () => {
  const allRaces = await getAllRacesMetaData();
  console.log(allRaces);
  await Promise.all([
    allRaces.map(async (race) => {
      await pushRaceMetaData(race);
    }),
  ]);
};
