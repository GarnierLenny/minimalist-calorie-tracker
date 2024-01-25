import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {  } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Animated, { FlipInEasyX, FlipOutEasyX } from 'react-native-reanimated';
import { unit } from "../Home.types";

type ChangeSelectButtonProps = {
  targetSelection: string;
};

type ChangeSectionProps = {
  intakeTrack: unit[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const ChangeSection = ({intakeTrack, selected, setSelected}: ChangeSectionProps) => {
  const changeSelected = async (newSelected: number) => {
    setSelected(newSelected);
    AsyncStorage.setItem('last-selected', newSelected.toString());
  };

  // console.log('from section', intakeTrack);
  const ChangeSelectButton = ({targetSelection}: ChangeSelectButtonProps) => {
    const capitalized = targetSelection.charAt(0).toUpperCase() + targetSelection.slice(1, targetSelection.length);

    return (
    <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 10}} onPress={() => changeSelected(intakeTrack.findIndex((item) => item.unitName === targetSelection))}>
      <Text>{capitalized}</Text>
    </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly', width: '70%', alignSelf: 'center'}}>
      {
        intakeTrack.map((item, index) => {
          return (
            item.unitName === selected ?
            <Animated.View key={index} style={{backgroundColor: '#000', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15}} entering={FlipInEasyX} exiting={FlipOutEasyX}>
              <Text style={{fontWeight: '600', color: '#fff'}}>{selected.charAt(0).toUpperCase() + selected.slice(1, selected.length)}</Text>
            </Animated.View>
            :
            <ChangeSelectButton key={index} targetSelection={item.unitName} />
          );
        })
      }
      <Text style={{padding: 5, marginLeft: 10, fontWeight: '500'}}>+</Text>
    </SafeAreaView>
  );
};

export default ChangeSection;
