import React, { useContext, useState, useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { IntakeContext } from "../../../context/Intake.context";
import { formatDate } from "../../../utils/formatDate";
import { valuesGoalDatesObject, heatData, heatValue } from "../Charts.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContributionGraph } from 'react-native-chart-kit';

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

const Heatmap = () => {
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
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
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

export default Heatmap;
