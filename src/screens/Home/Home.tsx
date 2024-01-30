import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IntakeContext } from "../../context/Intake.context";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { unit } from "./Home.types";
import { formatDate } from "../../utils/formatDate";
import ChangeSection from "./components/ChangeSection.component";
import ChangeValueButtons from "./components/ChangeValueButtons.component";
import DateSection from "./components/ChangeDate.component";
import CustomButtonIcon from "../../utils/CustomButton/CustomButtonIcon.utils";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  const {
    intakeTrack,
    setIntakeTrack,
    selected,
    setSelected,
    date,
    setDate,
    editGoal,
    setEditGoal,
  } = useContext(IntakeContext);
  const shared = {
    value: {
      fontSize: useSharedValue(43),
      fontWeight: useSharedValue(600),
      marginBottom: useSharedValue(0),
    },
    goal: {
      fontSize: useSharedValue(20),
      fontWeight: useSharedValue(400),
      marginBottom: useSharedValue(8),
    },
  }

  const focusValue = () => {
    shared.value.fontWeight.value = 600;
    shared.goal.fontWeight.value = 400;
    shared.value.marginBottom.value = withTiming(0);
    shared.goal.marginBottom.value = withTiming(8);

    shared.value.fontSize.value = withSpring(43);
    shared.goal.fontSize.value = withSpring(20);
  };

  const focusGoal = () => {
    shared.value.fontWeight.value = 400;
    shared.goal.fontWeight.value = 600;
    shared.value.marginBottom.value = withTiming(10);
    shared.goal.marginBottom.value = withTiming(-5);

    shared.value.fontSize.value = withSpring(20);
    shared.goal.fontSize.value = withSpring(43);
  };

  const textValueStyle = useAnimatedStyle(() => {
    return {
      fontWeight: shared.value.fontWeight.value.toString(),
      fontSize: shared.value.fontSize.value,
      marginBottom: shared.value.marginBottom.value,
    };
  });

  const textGoalStyle = useAnimatedStyle(() => {
    return {
      fontWeight: shared.goal.fontWeight.value.toString(),
      fontSize: shared.goal.fontSize.value,
      marginBottom: shared.goal.marginBottom.value,
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

        // await AsyncStorage.getItem(`${name}-${formatDate(date)}-goal`);
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

  const width = Dimensions.get('screen').width;

  const [fill, setFill] = useState<number>(intakeTrack[selected].value * 100 / intakeTrack[selected].goal);

  useEffect(() => {
    const updateFill = () => {
      setFill(intakeTrack[selected].value * 100 / intakeTrack[selected].goal);
    };

    updateFill();
  }, [intakeTrack, selected]);

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() +
    string.slice(1, string.length);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* date section*/}
      <DateSection />
      {/* 0g / 2100g section*/}
      <AnimatedCircularProgress
        size={width * 0.7}
        width={17}
        fill={fill}
        style={{alignSelf: 'center', marginBottom: 40}}
        tintColor="#00e0ff"
        // onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875"
      >
        {
        (fill) => (
        <SafeAreaView style={styles.valueGoalContainer}>
          <Animated.Text style={textValueStyle}>
            {intakeTrack[selected].value}
          </Animated.Text>
          <Animated.Text style={textGoalStyle}>
            /{intakeTrack[selected].goal}
            {intakeTrack[selected].unitType}
          </Animated.Text>
        </SafeAreaView>
        )
      }
      </AnimatedCircularProgress>
      <SafeAreaView style={styles.valueGoalButton}>
        <CustomButtonIcon
          pressCallback={() => {
            setEditGoal(!editGoal);
            return editGoal ? focusGoal() : focusValue();
          }}
          text={'Edit ' + (!editGoal ? 'intake' : 'goal')}
          iconName={!editGoal ? "pencil" : "target"}
          iconSize={20}
        />
      </SafeAreaView>
      <ChangeValueButtons />
      {/* Change selected intake section*/}
      <SafeAreaView style={{marginTop: 50}}>
        <ChangeSection />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectionText: {
    fontSize: 15,
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
  valueGoalContainer: {
    flexDirection: "row",
    paddingVertical: 50,
    justifyContent: "center",
    gap: 10,
    alignItems: "flex-end",
    backgroundColor: "rgba(255, 120, 0, 0)",
  },
  valueGoalButton: {
    alignSelf: 'flex-end',
    right: '5%',
    marginBottom: 10,
    top: '-4%',
  },
});

export default HomeScreen;
