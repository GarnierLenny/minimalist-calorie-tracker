import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { IntakeContext } from "../../context/Intake.context";
import { heatData } from "../../screens/Charts/Charts.types";
import { unit } from "../../screens/Home/Home.types";
import { RootStackParamList } from "./Tab.types";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ChartsScreen from "../../screens/Charts/Charts.screen";
import HomeScreen from "../../screens/Home/Home.screen";
import BMRParent from "../BMRParent/BMRParent.navigation";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabParent() {
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
  const [quarterYearData, setQuarterYearData] = useState<heatData[][]>([]);

  return (
    <IntakeContext.Provider value={{
      intakeTrack,
      setIntakeTrack,
      selected,
      setSelected,
      date,
      setDate,
      editGoal,
      setEditGoal,
      quarterYearData,
      setQuarterYearData,
      }}
    >
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Intake',
              tabBarIcon: ({ color, size }) => (
                <Icon name="checkbox-multiple-blank-circle-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Charts"
            initialParams={{intakeTrack}}
            component={ChartsScreen}
            options={{
              tabBarLabel: 'Intake',
              tabBarIcon: ({ color, size }) => (
                <Icon name="chart-bar" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
          name="BMRParent"
          component={BMRParent}
          options={{
            tabBarLabel: 'Intake',
            tabBarIcon: ({ color, size }) => (
              <Icon name="speedometer" color={color} size={size} />
            ),
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </IntakeContext.Provider>
  );
}