import React, { useContext, useState, useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { IntakeContext } from "../../../context/Intake.context";
import { formatDate } from "../../../utils/formatDate";
import { valuesGoalDatesObject, heatData, heatValue } from "../Charts.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContributionGraph } from 'react-native-chart-kit';

export const getValuesGoalsDates = (name: string, numberOfDays: number): valuesGoalDatesObject => {
  const values: string[] = [];
  const goals: string[] = [];
  const dates: string[] = [];
  const baseDate: Date = new Date();

  baseDate.setDate(baseDate.getDate() - (numberOfDays - 1));
  for (let i = 0; i < numberOfDays; i++) {
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

export const retrieveNDays = async (name: string, numberOfDays: number): Promise<heatData[]> => {
  const { values, goals, dates } = getValuesGoalsDates(name, numberOfDays);

  const queryValues = await AsyncStorage.multiGet(values);
  const queryGoals = await AsyncStorage.multiGet(goals);
  const defaultGoal = await AsyncStorage.getItem(`${name}-defaultgoal`);
  const heat: heatData[] = [];

  const scoreToHeat = (score: number): number | undefined => {
    return heatValue.find((heat) => score >= heat.lowerBound && score <= heat.upperBound)?.value;
  };

  for (let i = 0; i < numberOfDays; i++) {
    if (queryValues[i][1] !== null) {
      const score: number | undefined = queryGoals[i][1] === null ?
      scoreToHeat(Math.round(Number(queryValues[i][1]) * 100 / Number(defaultGoal)))
      :
      scoreToHeat(Math.round(Number(queryValues[i][1]) * 100 / Number(queryGoals[i][1])));

      heat.push({
        date: dates[i],
        count: score,
      });
    }
  };
  return heat;
};

const Heatmap = () => {
  const {
    intakeTrack,
  } = useContext(IntakeContext);
  const { quarterYearData, setQuarterYearData } = useContext(IntakeContext);
  const { selected } = useContext(IntakeContext);

  useEffect(() => {
    const callAndAssign = async () => {
      const calories = await retrieveNDays('calories', 90);
      const proteins = await retrieveNDays('proteins', 90);
      const water = await retrieveNDays('water', 90);

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
