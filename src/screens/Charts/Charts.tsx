import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContributionGraph } from 'react-native-chart-kit';
import { unit } from '../Home/Home.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from '../../utils/formatDate';
import { IntakeContext } from '../../context/Intake.context';
import ChangeSection from '../Home/components/ChangeSection.component';
import { valuesGoalDatesObject, heatData, heatValue } from './Charts.types';

const getValuesGoalsDates = (name: string): valuesGoalDatesObject => {
  const values: string[] = [];
  const goals: string[] = [];
  const dates: string[] = [];
  const baseDate: Date = new Date();

  baseDate.setDate(baseDate.getDate() - 89);
  for (let i = 0; i < 90; i++) {
    dates.push(formatDate(baseDate));

    values.push(`${name}-${dates[i]}-value`);
    goals.push(`${name}-${dates[i]}-goal`);
    baseDate.setDate(baseDate.getDate() + 1);
  };

  return {
    values,
    goals,
    dates,
  };
};

const retrieve90days = async (name: string): Promise<heatData[]> => {
  const { values, goals, dates } = getValuesGoalsDates(name);


  const queryValues = await AsyncStorage.multiGet(values);
  const queryGoals = await AsyncStorage.multiGet(goals);
  const defaultGoal = await AsyncStorage.getItem(`${name}-defaultgoal`);
  const caloriesHeat: heatData[] = [];

  const scoreToHeat = (score: number): number | undefined => {
    return heatValue.find((heat) => score >= heat.lowerBound && score <= heat.upperBound)?.value;
  };

  for (let i = 0; i < 90; i++) {
    if (queryValues[i][1] !== null) {
      const score: number | undefined = queryGoals[i][1] === null ?
      scoreToHeat(Math.round(Number(queryValues[i][1]) * 100 / Number(defaultGoal)))
      :
      scoreToHeat(Math.round(Number(queryValues[i][1]) * 100 / Number(queryGoals[i][1])));

      caloriesHeat.push({
        date: dates[i],
        count: score,
      });
    }
  };
  return caloriesHeat;
};

const HeatMapRender = () => {
  const {
    intakeTrack,
  } = useContext(IntakeContext);
  const [quarterYearData, setQuarterYearData] = useState<heatData[][]>([]);
  const { selected } = useContext(IntakeContext);

  useEffect(() => {
    const callAndAssign = async () => {
      const calories = await retrieve90days('calories');
      const proteins = await retrieve90days('proteins');
      const water = await retrieve90days('water');

      setQuarterYearData((old: heatData[][]) => {
        const newArr: heatData[][] = [...old];

        newArr.push(calories);
        newArr.push(proteins);
        newArr.push(water);
        return newArr;
      });
    };

    callAndAssign();
    return () => {};
  }, [intakeTrack]);

  const screenWidth = Dimensions.get('screen').width;
  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    strokeWidth: 3,
  };

  return (
    <SafeAreaView>
      <ContributionGraph
        values={quarterYearData[selected] === undefined ? [{}] : quarterYearData[selected]}
        endDate={new Date()}
        numDays={105}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </SafeAreaView>
  );
};

const ChartsScreen = () => {
return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.dailyText}>Daily consistency</Text>
      <HeatMapRender />
      <ChangeSection />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
  },
  timespanContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    width: '57%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  timespanText: {
    fontSize: 20,
  },
  dailyText: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default ChartsScreen;
