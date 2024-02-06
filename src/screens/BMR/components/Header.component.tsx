import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Basal Metabolic Rate Test</Text>
      {/* <Text style={styles.descriptionText}>The Basal Metabolic Rate indicate the daily amount calories your body needs without exercise</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 27,
    fontWeight: '600',
    marginVertical: '8%',
    alignSelf: 'center',
    maxWidth: '75%',
    textAlign: 'center',
  },
  descriptionText: {
    marginHorizontal: 13,
    fontWeight: '500',
  },
});

export default Header;
