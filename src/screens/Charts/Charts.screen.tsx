import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ChangeSection from '../Home/components/ChangeSection.component';
import Heatmap from './components/Heatmap.component';
import Circles from './components/CircleProgress.component';

const ChartsScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.dailyText}>Past 7 days average</Text>
      <Circles />
      <Text style={styles.dailyText}>Daily consistency</Text>
      <Heatmap />
      <SafeAreaView style={{marginTop: 10}}>
        <ChangeSection />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dailyText: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 20,
    fontWeight: '600',
    marginLeft: '5%',
  },
  mainContainer:
  {
    display: 'flex',
  },
});

export default ChartsScreen;
