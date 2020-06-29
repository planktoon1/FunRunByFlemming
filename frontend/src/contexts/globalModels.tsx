export interface InputRace {
  title: string;
  date: string;
  description: string;
  place: string;
  distances: string[];
}

export enum RaceState {
  HasBeenHeld,
  ToBeHeld,
}
export interface Race extends InputRace {
  state: RaceState;
}

export interface RacesByYear {
  [year: string]: Race[];
}
