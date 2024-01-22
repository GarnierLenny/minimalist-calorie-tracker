import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from "../../utils/IconButton/IconButton.component";
import styles from "./Home.styles";
import { RootStackParamList } from "../../../App";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const formatDate = (date: Date): string => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

type editAmountButtonProps = {
  value: string;
  disabled?: boolean;
};

type unit = {
  value: number;
  goal: number;
  unitType: string;
};

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const [calories, setCalories] = useState<unit>({
    value: 0,
    goal: 2100,
    unitType: 'cal',
  });
  const [proteins, setProteins] = useState<unit>({
    value: 0,
    goal: 100,
    unitType: 'g',
  });
  const [water, setWater] = useState<unit>({
    value: 0,
    goal: 3000,
    unitType: 'ml',
  });
  const [selected, setSelected] = useState<string>('calories');
  const [date, setDate] = useState<Date>(new Date());
  const [referenceDate, setReferenceDate] = useState<string>(formatDate(date));
  // const width = useSharedValue(10);

  type getSelectedType = {
    [key: string]: {
      unit: unit,
      setter: any,
    };
  };

  const getSelected: getSelectedType = {
    'calories': {
      unit: calories,
      setter: setCalories,
    },
    'proteins': {
      unit: proteins,
      setter: setProteins,
    },
    'water': {
      unit: water,
      setter: setWater,
    },
  };

  useEffect(() => {
    const getCalories = async (name: string, setter: any) => {
      try {
        const stored = await AsyncStorage.getItem(`${name}-${formatDate(date)}-value`);
        if (stored !== null) {
          setter((prevCalories: unit) => {
            return {
              ...prevCalories,
              value: JSON.parse(stored),
            }
          });
        } else {
          setter((prev: unit) => {
            return {
              ...prev,
              value: 0,
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCalories('calories', setCalories);
    getCalories('proteins', setProteins);
    getCalories('water', setWater);
  }, [date]);

  const changeDateHandler = (increment: number) => {
    setDate(oldDate => {
      const newDate = new Date(oldDate);

      newDate.setDate(newDate.getDate() + increment);
      return newDate;
    })
  }

  // AsyncStorage.clear();
  const EditAmountButton = ({value, disabled = false}: editAmountButtonProps) => {
    let inc = Number(value.split(' ')[1]);

    if (value[0] === '-')
      inc *= -1;
    return (
      <TouchableOpacity
      disabled={disabled}
      style={{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingVertical: 15 ,
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
      }} onPress={() => changedSelectedAmount(inc, getSelected[selected].setter)}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{value}</Text>
      </TouchableOpacity>
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

  // const handlePress = () => {
  //   width.value = withSpring(width.value + 50);
  // };

  return (
    <SafeAreaView style={{display: 'flex', justifyContent: 'center', flex: 1}}>
      {/* Change date section*/}
      <SafeAreaView style={styles.dateContainer}>
        <IconButton name="arrow-left-bold-circle" size={25} callback={() => changeDateHandler(-1)} />
        <Text style={styles.dateText}>{date.getDate()}/{date.getMonth() + 1}/
        {date.getFullYear()}</Text>
        <IconButton color='#000' disabled={formatDate(date) === referenceDate ? true : false} name="arrow-right-bold-circle" size={25} callback={() => changeDateHandler(+1)} />
      </SafeAreaView>
      {/* 0g / 2100g section*/}
      <SafeAreaView style={{flexDirection: 'row', paddingVertical: 50, justifyContent: 'center', alignItems: 'flex-end', gap: 15, backgroundColor: 'rgba(255, 120, 0, 0)'}}>
        <Text style={{fontWeight: '600', fontSize: 43 }}>{getSelected[selected].unit.value}</Text>
        <Text style={{fontWeight: '400', fontSize: 20, marginBottom: 8 }}>/{getSelected[selected].unit.goal}{getSelected[selected].unit.unitType}</Text>
      </SafeAreaView>
      {/* Change cal val section*/}
      <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
          <EditAmountButton disabled={getSelected[selected].unit.value === 0} value="- 100" />
          <EditAmountButton disabled={getSelected[selected].unit.value === 0} value="- 10" />
        </SafeAreaView>
        <TouchableOpacity onPress={() => changedSelectedAmount(getSelected[selected].unit.value * -1, getSelected[selected].setter)}>
          <Text style={{fontSize: 10, fontWeight: '600'}}>RESET</Text>
        </TouchableOpacity>
        <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
          <EditAmountButton value="+ 10" />
          <EditAmountButton value="+ 100" />
        </SafeAreaView>
      </SafeAreaView>
      {/* Change selected intake option section*/}
      <SafeAreaView style={{flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly', width: '70%', alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => setSelected('calories')}>
          <Text>Calories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected('proteins')}>
          <Text>Proteins</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected('water')}>
          <Text>Water</Text>
        </TouchableOpacity>
        <Text style={{right: 0}}>+</Text>
      </SafeAreaView>
      {/* <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.View
          style={{
            width,
            height: 100,
            backgroundColor: 'violet',
          }}
        />
        <Button onPress={handlePress} title="Click me" />
    </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
