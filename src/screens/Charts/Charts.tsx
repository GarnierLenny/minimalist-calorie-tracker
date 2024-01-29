import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type spanType = {
  timespans: string[];
  selected: number;
};

const ChartsScreen = () => {
  const [spans, setSpans] = useState<spanType>({
    timespans: [
    'Weekly',
    'Monthly',
    '6 months',
    ],
    selected: 0,
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SafeAreaView style={styles.timespanContainer}>
        <TouchableOpacity
          onPress={() => setSpans((old) => ({...spans, selected: old.selected - 1 < 0 ? spans.timespans.length - 1 : old.selected - 1}))}
        >
          <Icon name="less-than" size={26} />
        </TouchableOpacity>
        <Text style={styles.timespanText}>{spans.timespans[spans.selected]}</Text>
        <TouchableOpacity
          onPress={() => setSpans((old) => ({...spans, selected: old.selected + 1 === spans.timespans.length ? 0 : old.selected + 1}))}
        >
          <Icon name="greater-than" size={26} />
        </TouchableOpacity>
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
});

export default ChartsScreen;
