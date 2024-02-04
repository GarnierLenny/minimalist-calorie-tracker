export enum gender {
  male,
  female,
};

export type BMRForm = {
  age: number;
  weight: number;
  height: number;
  gender: gender;
};
