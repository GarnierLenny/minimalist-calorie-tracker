import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { unit, ChangeValueButtonsProps } from "../Home.types";
import { formatDate } from "../../../utils/formatDate";
import CustomButtonText from "../../../utils/CustomButton/CustomButtonText.utils";

const changeSelectedAmount = (
  increment: number,
  selected: unit,
  date: Date,
  setter: any) => {
  setter((prevArr: unit[]) => {
    const newAmount = selected.value + increment;
    let tempArray: unit[] = [...prevArr];

    tempArray[tempArray.findIndex((item) => item.unitName === selected.unitName)].value = newAmount;
    try {
      AsyncStorage.setItem(`${selected.unitName}-${formatDate(date)}-value`, JSON.stringify(newAmount));
    } catch (err) {
      console.log('Error in storing new value', err);
    }
    return tempArray;
  });
};

const ChangeValueButtons = ({date, setIntakeTrack, selected}: ChangeValueButtonsProps) => {
  const editCallback = (value: number) => {
    changeSelectedAmount(value, selected, date, setIntakeTrack);
  };

  return (
    <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <SafeAreaView style={{flexDirection: 'row', gap: 15}}>
        <CustomButtonText textContent="-100" pressCallback={() => editCallback(-100)} paddingInc={5} disabled={selected.value === 0} />
        <CustomButtonText textContent="-10" pressCallback={() => editCallback(-10)} disabled={selected.value === 0} />
      </SafeAreaView>
      <TouchableOpacity onPress={() => changeSelectedAmount(selected.value * -1, selected, date, setIntakeTrack)}>
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
