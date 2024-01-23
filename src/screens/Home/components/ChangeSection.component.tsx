import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {  } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Animated, { FlipInEasyX, FlipOutEasyX } from 'react-native-reanimated';

type ChangeSelectButtonProps = {
  targetSelection: string;
};

type ChangeSectionProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const ChangeSection = ({selected, setSelected}: ChangeSectionProps) => {
  const changeSelected = async (newSelected: string) => {
    setSelected(newSelected);
    AsyncStorage.setItem('last-selected', newSelected);
  };

  const ChangeSelectButton = ({targetSelection}: ChangeSelectButtonProps) => {
    const capitalized = targetSelection.charAt(0).toUpperCase() + targetSelection.slice(1, targetSelection.length);

    return (
    <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 10}} onPress={() => changeSelected(targetSelection)}>
      <Text>{capitalized}</Text>
    </TouchableOpacity>
    );
  };

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
