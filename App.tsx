import { StatusBar } from "expo-status-bar";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home/Home";
import ChartsScreen from "./src/screens/Charts/Charts";
import BMRScreen from "./src/screens/BMR/BMR";
import "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { unit } from "./src/screens/Home/Home.types";
import { IntakeContext } from "./src/context/Intake.context";


export type RootStackParamList = {
  Home: undefined;
  Charts: { intakeTrack: unit[] };
  BMR: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
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
          name="BMR"
          component={BMRScreen}
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

{
  /* <StatusBar style="auto" /> */
}
