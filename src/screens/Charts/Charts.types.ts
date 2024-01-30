type heatSpan = {
  lowerBound: number;
  upperBound: number;
  value: number;
};

export const heatValue: heatSpan[] = [
  {
    lowerBound: 0,
    upperBound: 0,
    value: 0,
  },
  {
    lowerBound: 1,
    upperBound: 20,
    value: 1,
  },
  {
    lowerBound: 21,
    upperBound: 40,
    value: 2,
  },
  {
    lowerBound: 41,
    upperBound: 60,
    value: 3,
  },
  {
    lowerBound: 61,
    upperBound: 80,
    value: 4,
  },
  {
    lowerBound: 81,
    upperBound: 100,
    value: 5,
  },
  {
    lowerBound: 101,
    upperBound: 999,
    value: 1,
  },
];

export type heatData = {
  date: string;
  count: number | undefined;
};

export type valuesGoalDatesObject = {
  values: string[];
  goals: string[];
  dates: string[];
};