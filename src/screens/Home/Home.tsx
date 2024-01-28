import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../../utils/IconButton/IconButton.component";
import { RootStackParamList } from "../../../App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  useSharedValue,
  FlipInEasyX,
  FlipOutEasyX,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { unit, getSelectedType } from "./Home.types";
import { formatDate } from "../../utils/formatDate";
import ChangeSection from "./components/ChangeSection.component";
import ChangeValueButtons from "./components/ChangeValueButtons.component";
import DateSection from "./components/ChangeDate.component";
import CustomButtonIcon from "../../utils/CustomButton/CustomButtonIcon.utils";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  const [intakeTrack, setIntakeTrack] = useState<unit[]>([
    {
      unitName: "calories",
      value: 0,
      goal: 2100,
      unitType: "cal",
    },
    {
      unitName: "proteins",
      value: 0,
      goal: 100,
      unitType: "g",
    },
    {
      unitName: "water",
      value: 0,
      goal: 3000,
      unitType: "ml",
    },
  ]);
  const [selected, setSelected] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [editGoal, setEditGoal] = useState<boolean>(true);

  const valueFontSize = useSharedValue(43);
  const valueFontWeight = useSharedValue(600);
  const valueMarginBottom = useSharedValue(0);

  const goalFontSize = useSharedValue(20);
  const goalFontWeight = useSharedValue(400);
  const goalMarginBotton = useSharedValue(8);

  const focusValue = () => {
    valueFontWeight.value = 600;
    goalFontWeight.value = 400;
    valueMarginBottom.value = withTiming(0);
    goalMarginBotton.value = withTiming(8);

    valueFontSize.value = withSpring(43);
    goalFontSize.value = withSpring(20);
  };

  const focusGoal = () => {
    valueFontWeight.value = 400;
    goalFontWeight.value = 600;
    valueMarginBottom.value = withTiming(10);
    goalMarginBotton.value = withTiming(-5);

    valueFontSize.value = withSpring(20);
    goalFontSize.value = withSpring(43);
  };

  const textValueStyle = useAnimatedStyle(() => {
    return {
      fontWeight: valueFontWeight.value.toString(),
      fontSize: valueFontSize.value,
      marginBottom: valueMarginBottom.value,
    };
  });

  const textGoalStyle = useAnimatedStyle(() => {
    return {
      fontWeight: goalFontWeight.value.toString(),
      fontSize: goalFontSize.value,
      marginBottom: goalMarginBotton.value,
    };
  });

  useEffect(() => {
    const setDefaultGoals = async (name: string, value: string) => {
      await AsyncStorage.setItem(`${name}-defaultgoal`, value);
    };

    const getIntake = async (name: string) => {
      try {
        const itemIndex = intakeTrack.findIndex(
          (item) => item.unitName === name,
        );
        const stored: string | null = await AsyncStorage.getItem(
          `${name}-${formatDate(date)}-value`,
        );
        const storedValue: number = stored === null ? 0 : Number(stored);

        await AsyncStorage.getItem(`${name}-${formatDate(date)}-goal`);
        const storedGoal: string | null = await AsyncStorage.getItem(
          `${name}-${formatDate(date)}-goal`,
        );
        let tempArray: unit[] = [...intakeTrack];

        if (storedGoal !== null) {
          tempArray[itemIndex].goal = Number(storedGoal);
          setIntakeTrack(tempArray);
        }

        if (stored === null) {
          await AsyncStorage.setItem(`${name}-${formatDate(date)}-value`, "0");
        } else {
          tempArray[itemIndex].value = storedValue;
          setIntakeTrack(tempArray);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getLastSelected = async () => {
      try {
        const lastSelected = await AsyncStorage.getItem("last-selected");
        if (lastSelected !== null) {
          setSelected(Number(lastSelected));
        }
      } catch {
        console.error("Error in retrieving last selected");
      }
    };

    getLastSelected();
    intakeTrack.map((intake: unit) => {
      setDefaultGoals(intake.unitName, intake.goal.toString());
      getIntake(intake.unitName);
    });
  }, [date]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* date section*/}
      <DateSection date={date} setDate={setDate} />
      {/* 0g / 2100g section*/}
      <SafeAreaView style={styles.valueGoalContainer}>
        <Animated.Text style={textValueStyle}>
          {intakeTrack[selected].value}
        </Animated.Text>
        <Animated.Text style={textGoalStyle}>
          /{intakeTrack[selected].goal}
          {intakeTrack[selected].unitType}
        </Animated.Text>
        <SafeAreaView style={styles.valueGoalButton}>
          <CustomButtonIcon
            pressCallback={() => {
              setEditGoal(!editGoal);
              return editGoal ? focusGoal() : focusValue();
            }}
            iconName={!editGoal ? "pencil" : "target"}
            iconSize={20}
          />
        </SafeAreaView>
      </SafeAreaView>
      {/* Change cal val section*/}
      <ChangeValueButtons
        selected={intakeTrack[selected]}
        setIntakeTrack={setIntakeTrack}
        date={date}
        editGoal={editGoal}
      />
      {/* Change selected intake section*/}
      <ChangeSection
        intakeTrack={intakeTrack}
        selected={intakeTrack[selected].unitName}
        setSelected={setSelected}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { display: "flex", justifyContent: "center", flex: 1 },
  valueGoalContainer: {
    flexDirection: "row",
    paddingVertical: 50,
    justifyContent: "center",
    gap: 10,
    alignItems: "flex-end",
    backgroundColor: "rgba(255, 120, 0, 0)",
  },
  valueGoalButton: { position: "absolute", right: "10%", alignSelf: "center" },
});

export default HomeScreen;
