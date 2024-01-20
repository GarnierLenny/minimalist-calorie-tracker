import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from "../../utils/IconButton.component";
import styles from "./Home.styles";
import { RootStackParamList } from "../../../App";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const [calories, setCalories] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const getCalories = async () => {
      try {
        const formatDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const storedCalories = await AsyncStorage.getItem(`calories-${formatDate}`);
        if (storedCalories !== null) {
          setCalories(JSON.parse(storedCalories));
        } else {
          setCalories(0);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCalories();
  }, [date]);


  const handleCalorieChange = async (increment: number) => {
    setCalories((prevCalories) => {
      const newCalories = prevCalories + increment;
      const formatDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      try {
        AsyncStorage.setItem(`calories-${formatDate}`, JSON.stringify(newCalories));
      } catch (err) {
        console.log('Error in storing new calories value', err);
      }
      return newCalories;
    });
  };

  const changeDateHandler = (increment: number) => {
    setDate(oldDate => {
      const newDate = new Date(oldDate);

      newDate.setDate(newDate.getDate() + increment);
      return newDate;
    })
  }

  return (
    <SafeAreaView style={{display: 'flex', justifyContent: 'center', flex: 1}}>
      <SafeAreaView style={styles.dateContainer}>
        <IconButton name="arrow-left-bold-circle" size={25} callback={() => changeDateHandler(-1)} />
        <Text style={styles.dateText}>{date.getDate()}/{date.getMonth() + 1}/
        {date.getFullYear()}</Text>
        <IconButton name="arrow-right-bold-circle" size={25} callback={() => changeDateHandler(+1)} />
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', gap: 20 }}>
        <Button title="-" onPress={() => handleCalorieChange(-10)} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{calories}</Text>
        <Button title="+" onPress={() => handleCalorieChange(+10)} />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
