import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { BMRStackParamList } from "../../../navigation/BMRParent/BMRParent.types";
import { intakeOptionType } from "../BMR.types";

const IntakeOption = (item: intakeOptionType) => {
  const {bmr, activity} = useRoute<RouteProp<BMRStackParamList, 'Result'>>().params;

  return (
    <SafeAreaView style={styles.intakeMapItem}>
      <Text style={styles.intakeMapItemText1}>{item.description}</Text>
      <SafeAreaView style={styles.subContainer}>
        <Text style={styles.intakeMapItemText2}>{Math.round(item.dailyIntake * (bmr * activity))} cal/day</Text>
        <Text style={styles.intakeMapItemText3}>{Math.round(item.dailyIntake * 100)}%</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  intakeMapItem: {
    // backgroundColor: 'rgba(233, 120, 20, 0.3)',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: 'row',
    paddingVertical: '3%',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  subContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  intakeMapItemText1: {
    fontSize: 16,
    flexWrap: 'wrap',
    maxWidth: '65%',
    fontWeight: '500',
  },
  intakeMapItemText2: {
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: '600',
  },
  intakeMapItemText3: {
    fontSize: 12,
    flexWrap: 'wrap',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default IntakeOption;
