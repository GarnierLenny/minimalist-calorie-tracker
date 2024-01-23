import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { unit, editAmountButtonProps } from "../Home.types";
import { formatDate } from "../../../utils/formatDate";
import { getSelectedType } from "../Home.types";

type ChangeValueButtonsProps = {
  selected: string;
  date: Date;
  getSelected: getSelectedType;
};

const ChangeValueButtons = ({selected, date, getSelected}: ChangeValueButtonsProps) => {
  const EditAmountButton = ({value, paddingInc = 0, disabled = false}: editAmountButtonProps) => {
    let inc = Number(value.replace(' ', ''));
    const [pressed, setPressed] = useState<boolean>(false);

    return (
      <SafeAreaView style={{display: 'flex', justifyContent: 'center'}}>
        <SafeAreaView
          style={{
            position: 'absolute',
            backgroundColor: '#000',
            borderRadius: 10,
            paddingVertical: 16 + paddingInc,
            zIndex: -1,
            paddingHorizontal: 11 + paddingInc,
            top: paddingInc !== 0 ? 5 : 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', color: pressed === true ? "rgba(255, 255, 255, 0.4)" : "#000"}}>{value}</Text>
        </SafeAreaView>
        <TouchableOpacity
        disabled={disabled}
        style={{
          borderWidth: 1,
          borderColor: pressed ? '#fff' : '#000',
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingVertical: 15 + paddingInc ,
          paddingHorizontal: 10 + paddingInc,
          display: 'flex',
          zIndex: 1,
          alignItems: 'center',
        }}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => changedSelectedAmount(inc, getSelected[selected].setter)}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>{value}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  };

  const changedSelectedAmount = (increment: number, setter: any) => {
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

  return (
    <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <SafeAreaView style={{flexDirection: 'row', gap: 15}}>
        <EditAmountButton paddingInc={5} disabled={getSelected[selected].unit.value === 0} value="- 100" />
        <EditAmountButton disabled={getSelected[selected].unit.value === 0} value="- 10" />
      </SafeAreaView>
      <TouchableOpacity onPress={() => changedSelectedAmount(getSelected[selected].unit.value * -1, getSelected[selected].setter)}>
        <Text style={{fontSize: 12, fontWeight: '600', color: '#1E90FF'}}>RESET</Text>
      </TouchableOpacity>
      <SafeAreaView style={{flexDirection: 'row', gap: 15}}>
        <EditAmountButton value="+ 10" />
        <EditAmountButton paddingInc={5} value="+ 100" />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ChangeValueButtons;
