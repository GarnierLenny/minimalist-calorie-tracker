import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.headerText}>BMR Test</Text>
      <Text style={styles.descriptionText}>The Basal Metabolic Rate estimates the daily amount calories your body needs without exercise</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 26,
    alignSelf: 'center',
  },
  descriptionText: {
    marginHorizontal: 13,
    fontWeight: '500',
  },
});

export default Header;
