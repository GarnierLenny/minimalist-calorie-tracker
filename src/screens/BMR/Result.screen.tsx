import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BMRStackParamList } from '../BMRParent.screen';
import { intakeOptionType, intakeOptions } from './BMR.types';

const IntakeOption = (item: intakeOptionType) => {
  const {bmr} = useRoute<RouteProp<BMRStackParamList, 'Result'>>().params;

  return (
    <SafeAreaView style={styles.intakeMapItem}>
      <Text style={styles.intakeMapItemText1}>{item.description}</Text>
      <Text style={styles.intakeMapItemText2}>{Math.round(item.dailyIntake * bmr)} cal/day</Text>
    </SafeAreaView>
  );
};

const ResultScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>Your BMR results</Text>
      <SafeAreaView style={styles.proteinsContainer}>
        <Text style={styles.proteinsText1}>Based on your BMR result you should have a daily intake of proteins of :</Text>
        <Text style={styles.proteinsText2}>78 - 120 grams per day</Text>
      </SafeAreaView>
      {
        intakeOptions.map(({description, dailyIntake}: intakeOptionType, index: number) =>
          <IntakeOption key={index} description={description} dailyIntake={dailyIntake} />
        )
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  proteinsText1: {
    fontSize: 17,
    fontWeight: '500',
  },
  proteinsText2: {
    fontSize: 17,
    fontWeight: '700',
    color: '#59b559',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 26,
    marginVertical: 10,
    alignSelf: 'center',
  },
  proteinsContainer: {
    // backgroundColor: 'rgba(233, 20, 120, 0.3)',
    marginHorizontal: '5%',
    marginBottom: '10%',
  },
  mainContainer: {
    display: 'flex',
    marginTop: 10,
    gap: 10,
  },
  intakeMapItem: {
    backgroundColor: 'rgba(233, 120, 20, 0.3)',
    flexDirection: 'row',
    paddingVertical: '3%',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  intakeMapItemText1: {
    fontSize: 18,
    flexWrap: 'wrap',
    maxWidth: '65%',
    fontWeight: '500',
  },
  intakeMapItemText2: {
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: '700',
  },
});

export default ResultScreen;
