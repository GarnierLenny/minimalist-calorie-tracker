export type getSelectedType = {
  [key: string]: {
    unit: unit;
    setter: any;
  };
};

export type customButtonTextrops = {
  pressCallback: any;
  textContent: string;
  fontSize?: number;
  paddingInc?: number;
  disabled?: boolean;
  backLayerOffset?: number;
};

export type customButtonIconProps = {
  pressCallback: any;
  iconName: string;
  iconSize: number;
  paddingInc?: number;
  disabled?: boolean;
  text?: string;
};

export type unit = {
  value: number;
  goal: number;
  unitName: string;
  unitType: string;
};