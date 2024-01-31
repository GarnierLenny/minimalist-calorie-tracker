import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IntakeContext } from "../../../context/Intake.context";
import { getValuesGoalsDates } from "./Heatmap.component";
import { ProgressBarProps, valueGoalObject, intakes, RenderIntakeProgressProps, intakeColor } from "../Charts.types";
import { ProgressChart } from 'react-native-chart-kit';
import { IntakeColors } from '../Charts.types';

const ProgressBar = ({progress, color}: ProgressBarProps) => {
  return (
    <SafeAreaView>
      <SafeAreaView style={{
        backgroundColor: '#2222',
        height: 5,
        marginTop: 6,
        borderRadius: 19}}
      />
      <SafeAreaView style={{
        position: 'absolute',
        backgroundColor: color,
        height: 5,
        marginTop: 6,
        width: `${progress}%`,
        borderRadius: 19}}
      />
    </SafeAreaView>
  );
};

const RenderIntakeProgress = ({name, value, color}: RenderIntakeProgressProps) => {
  return (
    <SafeAreaView style={{marginTop: 5, paddingHorizontal: 5, paddingRight: 13}}>
      <SafeAreaView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{marginTop: 10}}>{name}</Text>
        <Text style={{marginTop: 10}}>{(value * 100).toFixed(1)}%</Text>
      </SafeAreaView>
      <ProgressBar color={color} progress={value * 100} />
    </SafeAreaView>
  );
};

const Circles = () => {
  const {intakeTrack} = useContext(IntakeContext);
  const [intakes, setIntakes] = useState<intakes>({
    calories: {name: 'calories', values: [], goals: [], weekAverage: 0},
    proteins: {name: 'proteins', values: [], goals: [], weekAverage: 0},
    water: {name: 'water', values: [], goals: [], weekAverage: 0},
  });

  const weekIntakeAverage = async (intake: valueGoalObject): Promise<number> => {
    let valueSum: number = 0;
    let goalSum: number = 0;
    const defaultGoal: number = Number(await AsyncStorage.getItem(`${intake.name}-defaultgoal`));

    intake.values.map((item) => {
      valueSum += item[1] === null ? 0 : Number(item[1]);
    });
    intake.goals.map((item) => {
      goalSum += item[1] === null ? defaultGoal : Number(item[1]);
    });
    return Number(valueSum * 100 / goalSum);
  };

  useEffect(() => {
    const getIntakesWeekAverage = async () => {
      const calories = getValuesGoalsDates('calories', 7);
      const proteins = getValuesGoalsDates('proteins', 7);
      const water = getValuesGoalsDates('water', 7);

      let caloriesObject: valueGoalObject = {
        values: await AsyncStorage.multiGet(calories.values),
        goals: await AsyncStorage.multiGet(calories.goals),
        name: 'calories',
        weekAverage: 0,
      };

      let proteinsObject: valueGoalObject = {
        values: await AsyncStorage.multiGet(proteins.values),
        goals: await AsyncStorage.multiGet(proteins.goals),
        name: 'proteins',
        weekAverage: 0,
      };

      let waterObject: valueGoalObject = {
        values: await AsyncStorage.multiGet(water.values),
        goals: await AsyncStorage.multiGet(water.goals),
        name: 'water',
        weekAverage: 0,
      };

      caloriesObject.weekAverage = await weekIntakeAverage(caloriesObject);
      proteinsObject.weekAverage = await weekIntakeAverage(proteinsObject);
      waterObject.weekAverage = await weekIntakeAverage(waterObject);

      setIntakes((old: intakes) => {
        let newIntakes: intakes = {
          calories: caloriesObject,
          proteins: proteinsObject,
          water: waterObject,
        };

        return newIntakes;
      });
    };

    getIntakesWeekAverage();
    return () => {};
  }, [intakeTrack]);

  const progressData = [
    {
      name: 'Calories',
      value: intakes.calories.weekAverage / 100,
      color: IntakeColors.find((item: intakeColor) => item.unitName === 'calories')?.color,
    },
    {
      name: 'Proteins',
      value: intakes.proteins.weekAverage / 100,
      color: IntakeColors.find((item: intakeColor) => item.unitName === 'proteins')?.color,
    },
    {
      name: 'Water',
      value: intakes.water.weekAverage / 100,
      color: IntakeColors.find((item: intakeColor) => item.unitName === 'water')?.color,
    },
  ];
  const data = {
    labels: progressData.map((item) => item.name),
    data: progressData.map((item) => item.value),
    barColors: progressData.map((item) => item.color),
  };
  const screenWidth = Dimensions.get('screen').width;

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    strokeWidth: 3,
    color: (opacity = 1, index: number) => {
      const color = data.barColors[index];

      return `rgba(${color === undefined ? '0,0,0' : color}, ${opacity})`;
    },
  };

  return (
    <SafeAreaView style={styles.circleContainer}>
      <ProgressChart
        data={data}
        width={screenWidth * 0.5}
        height={220}
        strokeWidth={16}
        radius={22}
        chartConfig={{...chartConfig}}
        hideLegend={true}
      />
      <SafeAreaView style={styles.lineSeparator} />
      <SafeAreaView style={styles.circleRightContainer}>
        <SafeAreaView style={styles.circleRightHeader}>
          <Text style={styles.circleHeaderText}>Intakes</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.circleHeaderText}>See more </Text>
            <Icon name="arrow-right" />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={{marginTop: 10}}>
          {
            progressData.map((item, index) => (
              <RenderIntakeProgress color={`rgb(${item.color})`} key={index} name={item.name} value={item.value} />
            ))
          }
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  circleRightContainer: {
    flexDirection: 'column',
    display: 'flex',
    height: '80%',
    alignSelf: 'center',
    flex: 1,
  },
  circleRightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 10,
  },
  circleHeaderText: {
    fontSize: 13,
    fontWeight: '600',
  },
  circleContainer: {
    flexDirection: 'row',
  },
  lineSeparator: {
    height: '80%',
    width: 2,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Circles;
