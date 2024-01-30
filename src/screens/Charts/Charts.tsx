import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ChangeSection from '../Home/components/ChangeSection.component';
import Heatmap from './components/Heatmap.component';

const ChartsScreen = () => {
return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.dailyText}>Daily consistency</Text>
      <Heatmap />
      <SafeAreaView style={{marginTop: 0}}>
        <ChangeSection />
      </SafeAreaView>
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
  dailyText: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default ChartsScreen;
