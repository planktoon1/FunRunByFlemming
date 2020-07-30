import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Race, RacesByYear } from "./globalModels";
import { AuthContext } from "./AuthContext";

// Create an alternative structure - races by year
const processRaces = (races: Race[]): RacesByYear => {
  const racesByYear: RacesByYear = {};

  for (const race of races) {
    const raceDate = new Date(race.date);
    const year = raceDate.getFullYear();

    if (racesByYear[year]) {
      racesByYear[year].push(race);
    } else {
      racesByYear[year] = [race];
    }
  }

  return racesByYear;
};

interface Props {}

export enum DataMode {
  Public,
  AdminPreview,
}

interface GlobalContextI {
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
  selectedRace: Race | undefined;
  setSelectedRace: (race: Race) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  allRaces: Race[];
  racesByYear: RacesByYear;
}

export const GlobalContext = createContext<GlobalContextI>({
  dataMode: DataMode.Public,
  setDataMode: () => {},
  selectedRace: undefined,
  setSelectedRace: () => {},
  selectedYear: 2020,
  setSelectedYear: () => {},
  allRaces: [],
  racesByYear: {},
});

const GlobalContextProvider: React.FC<Props> = (props) => {
  const [selectedRace, setSelectedRace2] = useState<Race | undefined>(
    undefined
  );
  const [dataMode, setDataMode] = useState(DataMode.AdminPreview);
  const [selectedYear, setSelectedYear] = useState(2020);
  const { authFetch } = useContext(AuthContext);
  const history = useHistory();

  const [racesByYear, setRacesByYear] = useState<RacesByYear>({});
  const [allRaces, setAllRaces] = useState<Race[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataMode === DataMode.Public) {
          const url = `${process.env.REACT_APP_BASE_URL}/api/races`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await response.json();
          setAllRaces(json);
          setRacesByYear(processRaces(json));

          const urlParts = window.location.pathname.split("/");
          // TODO: Fix so that the correct year is also set
          if (urlParts[1] === "race" && urlParts[2] && urlParts[3]) {
            // Try to find the race specified in the url
            const urlRace = json.find(
              (r) => r.title === decodeURI(urlParts[3]).replace(":", "")
            );
            if (urlRace) {
              setSelectedRace2(urlRace);
              setSelectedYear(new Date(urlRace.date).getFullYear());
            }
            document.getElementById("action")?.scrollIntoView();
          }
        } else {
          // ####### PRIVATE ENDPOINT PAGE #########
          console.log("Admin page preview data...");

          const url = `${process.env.REACT_APP_BASE_URL}/admin/api/races`;
          const response = await authFetch(url);
          setAllRaces(response);
          setRacesByYear(processRaces(response));

          console.log(response);
        }
      } catch (error) {
        // TODO: Make better error handling - snackbar
        if (dataMode === DataMode.AdminPreview) {
          setDataMode(DataMode.Public);
          console.error("Error when fetching..");
        }
      }
    };
    fetchData();
  }, [dataMode]);

  const setSelectedRace = (race) => {
    const urlParts = window.location.pathname.split("/");
    if (urlParts[1] === "race" && urlParts[2]) {
      const dest = urlParts[2];

      history.push(`/race/${dest}/:${encodeURI(race.title)}`);
    }

    setSelectedRace2(race);
  };

  return (
    <GlobalContext.Provider
      value={{
        dataMode,
        setDataMode,
        selectedRace,
        setSelectedRace,
        selectedYear,
        setSelectedYear,
        allRaces,
        racesByYear,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
