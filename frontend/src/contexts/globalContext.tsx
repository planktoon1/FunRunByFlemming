import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { InputRace, Race, RacesByYear, RaceState } from "./globalModels";
const allRacesInput: InputRace[] = [
  {
    title: "Big Day Race",
    date: "2020-06-17T16:25:42.168Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
    place: "Platanale 46, Horsens",
    distances: ["21.1 km", "10 km"],
  },
  {
    title: "Super Fun Run",
    date: "2020-10-17T16:25:42.168Z",
    description:
      "Lorem ipsum dolor sit amet consectetur a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
    place: "Platanale 46, Horsens",
    distances: ["21.1 km", "5km"],
  },
  {
    title: "Last Day of the Year",
    date: "2020-12-31T16:25:42.168Z",
    description:
      "Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?  incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur?",
    place: "Platanale 46, Horsens",
    distances: ["21.1 km"],
  },
  {
    title: "Monster Hard",
    date: "2021-06-06T16:25:42.168Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
    place: "Platanale 46, Horsens",
    distances: ["21.1 km"],
  },
];

const processRaces = (races: InputRace[]): [RacesByYear, Race[]] => {
  const racesByYear: RacesByYear = {};
  const allRaces: Race[] = [];

  for (const race of races) {
    const raceDate = new Date(race.date);
    const now = new Date();
    const year = raceDate.getFullYear();
    const raceOutput: Race = {
      ...race,
      state: raceDate > now ? RaceState.HasBeenHeld : RaceState.ToBeHeld,
    };

    allRaces.push(raceOutput);
    if (racesByYear[year]) {
      racesByYear[year].push(raceOutput);
    } else {
      racesByYear[year] = [raceOutput];
    }
  }

  return [racesByYear, allRaces];
};

const [racesByYear, allRaces] = processRaces(allRacesInput);

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
  selectedRace: allRaces[0],
  setSelectedRace: () => {},
  selectedYear: 2020,
  setSelectedYear: () => {},
  allRaces,
  racesByYear,
});

const GlobalContextProvider: React.FC<Props> = (props) => {
  const [selectedRace, setSelectedRace2] = useState<Race | undefined>(
    undefined
  );
  const [selectedYear, setSelectedYear] = useState(2020);
  const history = useHistory();

  // On inital load check if url has selected a race, and make sure the state is set accordingly
  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    // TODO: Scroll to #action
    // TODO: Fix so that the correct year is also set
    if (urlParts[1] === "race" && urlParts[2] && urlParts[3]) {
      // Try to find the race specified in the url
      const urlRace = allRaces.find(
        (r) => r.title === decodeURI(urlParts[3]).replace(":", "")
      );
      if (urlRace) {
        setSelectedRace2(urlRace);
        setSelectedYear(new Date(urlRace.date).getFullYear());
      }
    }
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
