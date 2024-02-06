import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BMRScreen from "../../screens/BMR/BMR.screen";
import ResultScreen from "../../screens/BMR/Result.screen";
import { BMRStackParamList } from "./BMRParent.types";

const Stack = createNativeStackNavigator<BMRStackParamList>();

const BMRParent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={BMRScreen} name='BMR' />
      <Stack.Screen component={ResultScreen} name='Result' />
    </Stack.Navigator>
  );
};

export default BMRParent;
