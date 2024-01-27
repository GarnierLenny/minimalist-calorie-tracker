import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { unit, ChangeValueButtonsProps } from "../Home.types";
import { formatDate } from "../../../utils/formatDate";
import CustomButtonText from "../../../utils/CustomButton/CustomButtonText.utils";

const changeSelectedAmount = (
  newValue: number,
  selected: unit,
  date: Date,
  setter: any,
  valueGoal: string) => {
  setter((prevArr: unit[]) => {
    let tempArray: unit[] = [...prevArr];

    if (valueGoal === 'value')
      tempArray[tempArray.findIndex((item) => item.unitName === selected.unitName)].value = newValue;
    else
      tempArray[tempArray.findIndex((item) => item.unitName === selected.unitName)].goal = newValue;
    try {
      AsyncStorage.setItem(`${selected.unitName}-${formatDate(date)}-${valueGoal}`, JSON.stringify(newValue));
    } catch (err) {
      console.log('Error in storing new value', err);
    }
    return tempArray;
  });
};

const ChangeValueButtons = ({date, setIntakeTrack, selected, editGoal}: ChangeValueButtonsProps) => {
  const valueGoal = !editGoal ? 'goal' : 'value';
  const editCallback = (value: number) => {
    const newValue = !editGoal ? selected.goal + value : selected.value + value;
    changeSelectedAmount(newValue, selected, date, setIntakeTrack, valueGoal);
  };

  return (
    <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <SafeAreaView style={{flexDirection: 'row', gap: 15}}>
        <CustomButtonText textContent="-100" pressCallback={() => editCallback(-100)} paddingInc={5} disabled={!editGoal ? (selected.goal === 0) : (selected.value === 0)} />
        <CustomButtonText textContent="-10" pressCallback={() => editCallback(-10)} disabled={!editGoal ? (selected.goal === 0) : (selected.value === 0)} />
      </SafeAreaView>
      <TouchableOpacity onPress={async () => {
          const newAmount = !editGoal ? Number(await AsyncStorage.getItem(`${selected.unitName}-defaultgoal`)) : 0;

          return changeSelectedAmount(newAmount, selected, date, setIntakeTrack, valueGoal);
        }}>
        <Text style={{fontSize: 12, fontWeight: '600', color: '#1E90FF'}}>RESET</Text>
      </TouchableOpacity>
      <SafeAreaView style={{flexDirection: 'row', gap: 15}}>
        <CustomButtonText textContent="+10" pressCallback={() => editCallback(10)} />
        <CustomButtonText textContent="+100" pressCallback={() => editCallback(100)} paddingInc={5} />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ChangeValueButtons;
