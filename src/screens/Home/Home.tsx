import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from "../../utils/IconButton/IconButton.component";
import styles from "./Home.styles";
import { RootStackParamList } from "../../../App";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, FlipInEasyX, FlipOutEasyX, withTiming, Easing, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { unit, getSelectedType } from "./Home.types";
import { formatDate } from "../../utils/formatDate";
import ChangeSection from "./components/ChangeSection.component";
import ChangeValueButtons from "./components/ChangeValueButtons.component";
import DateSection from "./components/ChangeDate.component";
import CustomButtonIcon from "../../utils/CustomButton/CustomButtonIcon.utils";

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

    const getLastSelected = async () => {
      try {
        const lastSelected = await AsyncStorage.getItem('last-selected');
        if (lastSelected !== null) {
          setSelected(lastSelected);
        }
      } catch {
        console.error('Error in retrieving last selected');
      }
    };

    getLastSelected();
    getCalories('calories', setCalories);
    getCalories('proteins', setProteins);
    getCalories('water', setWater);
  }, [date]);

  return (
    <SafeAreaView style={{display: 'flex', justifyContent: 'center', flex: 1}}>
      {/* date section*/}
      <DateSection date={date} setDate={setDate} />
      {/* 0g / 2100g section*/}
      <SafeAreaView style={{flexDirection: 'row', left: '2.5%', paddingVertical: 50, justifyContent: 'center', alignItems: 'flex-end', gap: 15, backgroundColor: 'rgba(255, 120, 0, 0)'}}>
        <Text style={{fontWeight: '600', fontSize: 43 }}>{getSelected[selected].unit.value}</Text>
        <Text style={{fontWeight: '400', fontSize: 20, marginBottom: 8 }}>/{getSelected[selected].unit.goal}{getSelected[selected].unit.unitType}</Text>
        <CustomButtonIcon pressCallback={() => console.log('click!')} iconName="pencil" iconSize={20}  />
      </SafeAreaView>
      {/* Change cal val section*/}
      <ChangeValueButtons selected={selected} getSelected={getSelected} date={date} />
      {/* Change selected intake section*/}
      <ChangeSection selected={selected} setSelected={setSelected} />
    </SafeAreaView>
  );
};

export default HomeScreen;
