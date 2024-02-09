import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ChangeSection from '../Home/components/ChangeSection.component';
import Heatmap from './components/Heatmap.component';
import Circles from './components/CircleProgress.component';

const ChartsScreen = () => {
  return (
    <SafeAreaView style={styles.alignContainer}>
      <Text style={styles.mainTitle}>Your intake stats</Text>
      <SafeAreaView style={styles.mainContainer}>
        <SafeAreaView>
          <Text style={styles.dailyText}>Past 7 days average</Text>
          <Circles />
        </SafeAreaView>
        <SafeAreaView>
          <Text style={styles.dailyText}>Daily consistency</Text>
          <Heatmap />
          <SafeAreaView style={{marginTop: 10}}>
            <ChangeSection />
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    marginLeft: '3%',
    fontWeight: '800',
    fontSize: 25,
  },
  alignContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  dailyText: {
    fontSize: 16,
    marginVertical: '5%',
    fontWeight: '600',
    marginLeft: '5%',
  },
  mainContainer:
  {
    marginTop: '5%',
    gap: 20,
    display: 'flex',
  },
});

export default ChartsScreen;
