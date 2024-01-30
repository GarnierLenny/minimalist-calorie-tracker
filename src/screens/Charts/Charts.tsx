import React from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions } from 'react-native';
import ChangeSection from '../Home/components/ChangeSection.component';
import Heatmap from './components/Heatmap.component';
import { ProgressChart } from 'react-native-chart-kit';

const Circles = () => {
  const data = {
    labels: ['Calories', 'Proteins', 'Water'],
    data: [0.4, 0.6, 0.8]
  };
  const screenWidth = Dimensions.get('screen').width;

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    strokeWidth: 3,
  };

  return (
    <SafeAreaView>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </SafeAreaView>
  );
};

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
    marginLeft: 10,
  },
  mainContainer:
  {
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
});

export default ChartsScreen;
