import { getAllRacesMetaData } from "./api/services/sheets/getAllRacesMetaData";
import { pushRaceMetaData } from "./api/services/db/pushRaceMetaData";

const app = async () => {
  const allRaces = await getAllRacesMetaData();
  console.log(allRaces);
  Promise.all([
    allRaces.map(async (race) => {
      await pushRaceMetaData(race);
    }),
  ]);
};
app();
