export type getSelectedType = {
  [key: string]: {
    unit: unit,
    setter: any,
  };
};

export type editAmountButtonProps = {
  value: string;
  paddingInc?: number;
  disabled?: boolean;
};

export type unit = {
  value: number;
  goal: number;
  unitType: string;
};