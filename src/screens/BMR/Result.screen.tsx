import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { intakeOptionType, intakeOptions } from './BMR.types';
import IntakeOption from './components/IntakeOption.component';
import { BMRStackParamList } from '../../navigation/BMRParent/BMRParent.types';
import { RouteProp, useRoute } from '@react-navigation/native';

const ResultScreen = ({navigation}: NativeStackScreenProps<BMRStackParamList, 'Result'>) => {
  const {weight} = useRoute<RouteProp<BMRStackParamList, 'Result'>>().params;
  const prot = weight * 1.5;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>Your BMR results</Text>
      <SafeAreaView style={styles.proteinsContainer}>
        <Text style={styles.proteinsText1}>Based on your BMR result you should have a daily intake of proteins of :</Text>
        <Text style={styles.proteinsText2}>{Math.round(prot * 0.73)} - {Math.round(prot * 1.22)} grams per day</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.mapContainer}>
      {
        intakeOptions.map(({description, dailyIntake}: intakeOptionType, index: number) =>
          <IntakeOption key={index} description={description} dailyIntake={dailyIntake} />
        )
      }
      </SafeAreaView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  goBackText: {
    color: "#1E90FF",
    marginLeft: '5%',
    fontSize: 15,
  },
  mapContainer: {
    // backgroundColor: '#ff2',
    gap: 10,
    marginTop: '2%',
  },
  proteinsText1: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: '5%',
  },
  proteinsText2: {
    fontSize: 18,
    marginTop: 5,
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
  },
  mainContainer: {
    display: 'flex',
    marginTop: 10,
    gap: 10,
  },
});

export default ResultScreen;
