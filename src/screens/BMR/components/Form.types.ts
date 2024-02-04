import { Control } from "react-hook-form";

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
