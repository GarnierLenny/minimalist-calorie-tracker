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
    description: 'Great weight gain',
    dailyIntake: 1.24,
  },
  {
    description: 'Weight gain',
    dailyIntake: 1.16,
  },
  {
    description: 'Light weight gain',
    dailyIntake: 1.08,
  },
  {
    description: 'Maintain weight',
    dailyIntake: 1,
  },
  {
    description: 'Light weight loss',
    dailyIntake: 0.92,
  },
  {
    description: 'Weight loss',
    dailyIntake: 0.84,
  },
  {
    description: 'Great weight loss',
    dailyIntake: 0.76,
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
