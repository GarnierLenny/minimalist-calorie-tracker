import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Basal Metabolic Rate Test</Text>
      <SafeAreaView style={styles.descContainer}>
        <Text style={styles.headerDesc}>The Basal Metabolic Rate (BMR) is the amount of energy (calories) that your body needs to maintain basic physiological functions while at rest.</Text>
        <Text style={styles.headerDesc}>These functions include breathing, circulation, cell production, nutrient processing, and other activities that keep your body alive and functioning properly.</Text>
      </SafeAreaView>
      {/* <Text style={styles.descriptionText}>The Basal Metabolic Rate indicate the daily amount calories your body needs without exercise</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    gap: 10,
  },
  descContainer: {
    gap: 5,
    marginTop: '3%',
    marginBottom: '7%',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: '8%',
    alignSelf: 'flex-start',
    maxWidth: '90%',
    textAlign: 'center',
  },
  headerDesc: {
    fontSize: 15,
  },
  descriptionText: {
    marginHorizontal: 13,
    fontWeight: '500',
  },
});

export default Header;
