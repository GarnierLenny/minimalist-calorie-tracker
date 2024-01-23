import React, {  } from "react";
import { SafeAreaView, Text } from "react-native";
import Animated, { FlipInEasyX, FlipOutEasyX } from 'react-native-reanimated';

const ChangeSection = ({selected, ChangeSelectButton}) => {
  return (
    <SafeAreaView style={{flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly', width: '70%', alignSelf: 'center'}}>
      {selected === 'calories' ?
        <Animated.View style={{backgroundColor: '#000', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15}} entering={FlipInEasyX} exiting={FlipOutEasyX}>
          <Text style={{fontWeight: '600', color: '#fff'}}>Calories</Text>
        </Animated.View>
        :
        <ChangeSelectButton targetSelection="calories" />}
      {selected === 'proteins' ?
        <Animated.View style={{backgroundColor: '#000', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15}} entering={FlipInEasyX} exiting={FlipOutEasyX}>
          <Text style={{fontWeight: '600', color: '#fff'}}>Proteins</Text>
        </Animated.View>
        :
        <ChangeSelectButton targetSelection="proteins" />}
      {selected === 'water' ?
        <Animated.View style={{backgroundColor: '#000', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15}} entering={FlipInEasyX} exiting={FlipOutEasyX}>
          <Text style={{fontWeight: '600', color: '#fff'}}>Water</Text>
        </Animated.View>
        :
        <ChangeSelectButton targetSelection="water" />}
      <Text style={{padding: 5, marginLeft: 10, fontWeight: '500'}}>+</Text>
    </SafeAreaView>
  );
};

export default ChangeSection;
