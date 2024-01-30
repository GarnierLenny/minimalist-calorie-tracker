import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContributionGraph } from 'react-native-chart-kit';
import { unit } from '../Home/Home.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from '../../utils/formatDate';
import { IntakeContext } from '../../context/Intake.context';

type chartMap = {
  span: string;
  chart: JSX.Element;
}

type spanType = {
  timespans: chartMap[];
  selected: number;
};

type heatSpan = {
  lowerBound: number;
  upperBound: number;
  value: number;
};

const heatValue: heatSpan[] = [
  {
    lowerBound: 0,
    upperBound: 0,
    value: 0,
  },
  {
    lowerBound: 1,
    upperBound: 20,
    value: 1,
  },
  {
    lowerBound: 21,
    upperBound: 40,
    value: 2,
  },
  {
    lowerBound: 41,
    upperBound: 60,
    value: 3,
  },
  {
    lowerBound: 61,
    upperBound: 80,
    value: 4,
  },
  {
    lowerBound: 81,
    upperBound: 100,
    value: 5,
  },
  {
    lowerBound: 101,
    upperBound: 999,
    value: 1,
  },
];

type intake90days = {
  calories: number[];
  proteins: number[];
  water: number[];
};

type heatData = {
  date: string;
  count: number | undefined;
};

const retrieve90days = async (): Promise<heatData[]> => {
  let result: intake90days = {
    calories: [],
    proteins: [],
    water: [],
  };
  const baseDate: Date = new Date();
  baseDate.setDate(baseDate.getDate() - 89);

  const values: string[] = [];
  const goals: string[] = [];
  const dates: string[] = [];

  for (let i = 0; i < 90; i++) {
    dates.push(formatDate(baseDate));

    values.push(`calories-${dates[i]}-value`);
    goals.push(`calories-${dates[i]}-goal`);
    baseDate.setDate(baseDate.getDate() + 1);
  };
  const caloriesValues = await AsyncStorage.multiGet(values);
  const caloriesGoals = await AsyncStorage.multiGet(goals);
  const defaultGoal = await AsyncStorage.getItem('calories-defaultgoal');

  const caloriesHeat: heatData[] = [];

  const scoreToHeat = (score: number): number | undefined => {
    return heatValue.find((heat) => score >= heat.lowerBound && score <= heat.upperBound)?.value;
  };

  for (let i = 0; i < 90; i++) {
    if (caloriesValues[i][1] !== null) {
      const score: number | undefined = caloriesGoals[i][1] === null ?
      scoreToHeat(Math.round(Number(caloriesValues[i][1]) * 100 / Number(defaultGoal)))
      :
      scoreToHeat(Math.round(Number(caloriesValues[i][1]) * 100 / Number(caloriesGoals[i][1])));

      // caloriesHeat.push({
      //   date: dates[i],
      //   count: 0,
      // })
      caloriesHeat.push({
        date: dates[i],
        count: score,
      });
    }
  };
  // result.calories = caloriesHeat;
  console.log('calories', caloriesHeat);
  return caloriesHeat;
};

const BarChartRender = () => {
  const {
    intakeTrack,
  } = useContext(IntakeContext);
  const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50]
      }
    ]
  };
  const [quarterYearData, setQuarterYearData] = useState<heatData[]>([]);

  useEffect(() => {
    const callAndAssign = async () => {
      const res = await retrieve90days();

      setQuarterYearData(res);
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

  const commitsData = [
    { date: "2024-1-1", count: 3 },
    { date: "2024-01-03", count: 2 },
    { date: "2024-01-04", count: 3 },
    { date: "2024-01-05", count: 4 },
    { date: "2024-01-06", count: 5 },
    { date: "2024-01-07", count: 1 },
  ];

  return (
    <SafeAreaView>
      <ContributionGraph
        values={quarterYearData}
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
  const [spans, setSpans] = useState<spanType>({
  timespans: [
    {span: '7 days', chart: <BarChartRender />},
    {span: '1 month', chart: <BarChartRender />},
    {span: '3 months', chart: <BarChartRender />},
    ],
    selected: 0,
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Timespan select section */}
      <SafeAreaView style={styles.timespanContainer}>
        <TouchableOpacity
          onPress={() => setSpans((old) => ({...spans, selected: old.selected - 1 < 0 ? spans.timespans.length - 1 : old.selected - 1}))}
        >
          <Icon name="less-than" size={26} />
        </TouchableOpacity>
        <Text style={styles.timespanText}>{spans.timespans[spans.selected].span}</Text>
        <TouchableOpacity
          onPress={() => setSpans((old) => ({...spans, selected: old.selected + 1 === spans.timespans.length ? 0 : old.selected + 1}))}
        >
          <Icon name="greater-than" size={26} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Chart section */}
      {spans.timespans[spans.selected].chart}
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
});

export default ChartsScreen;
