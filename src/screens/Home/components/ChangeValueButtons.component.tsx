import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { unit, ChangeValueButtonsProps } from "../Home.types";
import { formatDate } from "../../../utils/formatDate";
import CustomButtonText from "../../../utils/CustomButton/CustomButtonText.utils";

const changedSelectedAmount = (
  increment: number,
  selected: string,
  date: Date,
  setter: any) => {
  setter((prevValue: unit) => {
    const newAmount: number = (prevValue.value + increment) < 0 ? 0 : (prevValue.value + increment);

    try {
      AsyncStorage.setItem(`${selected}-${formatDate(date)}-value`, JSON.stringify(newAmount));
    } catch (err) {
      console.log('Error in storing new calories value', err);
    }
    return ({
      ...prevValue,
      value: newAmount,
    });
  });
};

const ChangeValueButtons = ({selected, date, getSelected}: ChangeValueButtonsProps) => {
  const editCallback = (value: number) => {
    changedSelectedAmount(value, selected, date, getSelected[selected].setter)
  };

  return (
    <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <SafeAreaView style={{flexDirection: 'row', gap: 15}}>
        <CustomButtonText textContent="-100" pressCallback={() => editCallback(-100)} paddingInc={5} disabled={getSelected[selected].unit.value === 0} />
        <CustomButtonText textContent="-10" pressCallback={() => editCallback(-10)} disabled={getSelected[selected].unit.value === 0} />
      </SafeAreaView>
      <TouchableOpacity onPress={() => changedSelectedAmount(getSelected[selected].unit.value * -1, selected, date, getSelected[selected].setter)}>
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
