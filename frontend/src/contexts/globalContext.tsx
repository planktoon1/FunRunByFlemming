import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Race, RacesByYear } from "./globalModels";

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

interface GlobalContextI {
  selectedRace: Race | undefined;
  setSelectedRace: (race: Race) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  allRaces: Race[];
  racesByYear: RacesByYear;
}

export const GlobalContext = createContext<GlobalContextI>({
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
  const [selectedYear, setSelectedYear] = useState(2020);
  const history = useHistory();

  const [racesByYear, setRacesByYear] = useState<RacesByYear>({});
  const [allRaces, setAllRaces] = useState<Race[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_BASE_URL}/races`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setAllRaces(json);
        setRacesByYear(processRaces(json));

        console.log(json);

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
      } catch (error) {
        // TODO: Make better error handling - snackbar
        console.error("Error when fetching..");
      }
    };
    fetchData();
  }, []);

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
