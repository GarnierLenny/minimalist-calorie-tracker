import { Control } from "react-hook-form";

export enum gender {
  male,
  female,
};

export type intakeOptionType = {
  description: string;
  dailyIntake: number;
};

export const intakeOptions: intakeOptionType[] = [
  {
    description: 'Little to no exercise',
    dailyIntake: 1.25,
  },
  {
    description: 'Light exercises 1-3 days/week',
    dailyIntake: 1.45,
  },
  {
    description: 'Moderade exercises 3-5 days/week',
    dailyIntake: 1.63,
  },
  {
    description: 'Hard exercises 6-7 days/week',
    dailyIntake: 1.81,
  },
  {
    description: 'Daily intense exercises or physical job',
    dailyIntake: 2.2,
  },
];

export enum genderEnum {
  male = 'male',
  female = 'female',
};

export type FormFields = {
  age: string;
  height: string;
  weight: string;
};

export type FormControlProps = {
  control: Control<FormFields, any>;
  formField: string;
  placeHolder: string;
  inputTitle: string;
  unit: string;
};

export type CheckDotProps = {
  newGender: genderEnum;
};
