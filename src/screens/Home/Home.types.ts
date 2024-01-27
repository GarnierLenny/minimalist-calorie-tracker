export type getSelectedType = {
  [key: string]: {
    unit: unit,
    setter: any,
  };
};

export type customButtonTextrops = {
  pressCallback: any;
  textContent: string;
  paddingInc?: number;
  disabled?: boolean;
};

export type customButtonIconProps = {
  pressCallback: any;
  iconName: string;
  iconSize: number;
  paddingInc?: number;
  disabled?: boolean;
};

export type unit = {
  value: number;
  goal: number;
  unitName: string;
  unitType: string;
};

export type ChangeValueButtonsProps = {
  date: Date;
  setIntakeTrack: any;
  selected: unit;
  editGoal: boolean;
};
