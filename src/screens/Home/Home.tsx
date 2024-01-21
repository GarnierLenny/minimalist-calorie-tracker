import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from "../../utils/IconButton/IconButton.component";
import styles from "./Home.styles";
import { RootStackParamList } from "../../../App";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const formatDate = (date: Date): string => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

type editAmountButtonProps = {
  value: string;
};

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const [calories, setCalories] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [referenceDate, setReferenceDate] = useState<string>(formatDate(date));

  useEffect(() => {
    const getCalories = async () => {
      try {
        const storedCalories = await AsyncStorage.getItem(`calories-${formatDate(date)}`);
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
      try {
        AsyncStorage.setItem(`calories-${formatDate(date)}`, JSON.stringify(newCalories));
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

  // AsyncStorage.clear();
  const EditAmountButton = ({value}: editAmountButtonProps) => {
    let inc = Number(value.split(' ')[1]);

    if (value[0] === '-')
      inc *= -1;
    return (
      <TouchableOpacity style={{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingVertical: 15 ,
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
      }} onPress={() => handleCalorieChange(inc)}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{value}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={{display: 'flex', justifyContent: 'center', flex: 1}}>
      <SafeAreaView style={styles.dateContainer}>
        <IconButton name="arrow-left-bold-circle" size={25} callback={() => changeDateHandler(-1)} />
        <Text style={styles.dateText}>{date.getDate()}/{date.getMonth() + 1}/
        {date.getFullYear()}</Text>
        <IconButton color='#000' disabled={formatDate(date) === referenceDate ? true : false} name="arrow-right-bold-circle" size={25} callback={() => changeDateHandler(+1)} />
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', gap: 20 }}>
        <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
          <EditAmountButton value="- 100" />
          <EditAmountButton value="- 10" />
        </SafeAreaView>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{calories}</Text>
        <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
          <EditAmountButton value="+ 10" />
          <EditAmountButton value="+ 100" />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
