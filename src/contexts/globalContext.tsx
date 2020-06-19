import React, { createContext, useState } from "react";
const mockRaceObject: RacesByYear = {
  "2020": [
    {
      title: "Big Day Race",
      date: "2020-06-17T16:25:42.168Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
    {
      title: "Super Fun Run",
      date: "2020-10-17T16:25:42.168Z",
      description:
        "Lorem ipsum dolor sit amet consectetur a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
    {
      title: "Last Day of the Year",
      date: "2020-12-31T16:25:42.168Z",
      description:
        "Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?  incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
  ],
  "2021": [
    {
      title: "Monster Hard",
      date: "2021-06-06T16:25:42.168Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
  ],
};

interface Props {}

interface GlobalContextI {
  selectedRace: Race;
  setSelectedRace: (race: Race) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  allRaces: Race[];
}

const GlobalContext = createContext<GlobalContextI>({
  selectedRace: mockRaceObject["2020"][0],
  setSelectedRace: () => {},
  selectedYear: 2020,
  setSelectedYear: () => {},
  allRaces: [],
});

const GlobalContextProvider: React.FC<Props> = (props) => {
  const [selectedRace, setSelectedRace] = useState(mockRaceObject["2020"][0]);
  const [selectedYear, setSelectedYear] = useState(2020);

  return (
    <GlobalContext.Provider
      value={{
        selectedRace,
        setSelectedRace,
        selectedYear,
        setSelectedYear,
        allRaces: [],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

interface Race {
  title: string;
  date: string;
  description: string;
  place: string;
  distance: string;
}

interface RacesByYear {
  [year: string]: Race[];
}
