import React, { createContext } from 'react';
import { unit } from '../screens/Home/Home.types';
import { heatData } from '../screens/Charts/Charts.types';

// intakeTrack,
// setIntakeTrack,
// selected,
// setSelected,
// date,
// setDate,
// editGoal,
// setEditGoal,

type IntakeContextType = {
  intakeTrack: unit[];
  setIntakeTrack: React.Dispatch<React.SetStateAction<unit[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  editGoal: boolean;
  setEditGoal: React.Dispatch<React.SetStateAction<boolean>>;
  quarterYearData: heatData[][],
  setQuarterYearData: React.Dispatch<React.SetStateAction<heatData[][]>>;
};

const defaultValues: IntakeContextType = {
  intakeTrack: [],
  setIntakeTrack: () => {},
  selected: 0,
  setSelected: () => {},
  date: new Date(),
  setDate: () => {},
  editGoal: false,
  setEditGoal: () => {},
  quarterYearData: [],
  setQuarterYearData: () => {},
};

export const IntakeContext = createContext<IntakeContextType>({...defaultValues});
