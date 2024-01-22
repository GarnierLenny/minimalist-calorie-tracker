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
};

type unitTableType = {
  [key: string]: string;
}

const unitTable: unitTableType = {
  'calories': 'cal',
  'protein': 'g',
  'water': 'L',
};

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const [calories, setCalories] = useState<number>(0);
  const [caloriesGoal, setCaloriesGoal] = useState<number>(2100);
  const [selected, setSelected] = useState<string>('calories');
  const [date, setDate] = useState<Date>(new Date());
  const [referenceDate, setReferenceDate] = useState<string>(formatDate(date));
  // const width = useSharedValue(10);

  useEffect(() => {
    const getCalories = async () => {
      try {
        const storedCalories = await AsyncStorage.getItem(`${selected}-${formatDate(date)}`);
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
        AsyncStorage.setItem(`${selected}-${formatDate(date)}`, JSON.stringify(newCalories));
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
        <Text style={{fontWeight: '600', fontSize: 43 }}>{calories}</Text>
        <Text style={{fontWeight: '400', fontSize: 20, marginBottom: 8 }}>/{caloriesGoal}{unitTable[selected]}</Text>
      </SafeAreaView>
      {/* Change cal val section*/}
      <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
          <EditAmountButton value="- 100" />
          <EditAmountButton value="- 10" />
        </SafeAreaView>
        <TouchableOpacity onPress={() => handleCalorieChange(calories * -1)}>
          <Text style={{fontSize: 10, fontWeight: '600'}}>RESET</Text>
        </TouchableOpacity>
        <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
          <EditAmountButton value="+ 10" />
          <EditAmountButton value="+ 100" />
        </SafeAreaView>
      </SafeAreaView>
      {/* Change selected intake option section*/}
      <SafeAreaView style={{flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly', width: '70%', alignSelf: 'center'}}>
        <TouchableOpacity>
          <Text>Calories</Text>
        </TouchableOpacity>
        <Text>Proteins</Text>
        <Text>Water</Text>
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
