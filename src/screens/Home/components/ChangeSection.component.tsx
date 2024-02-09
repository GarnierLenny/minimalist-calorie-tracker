import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import Animated, { FlipInEasyX, FlipOutEasyX } from "react-native-reanimated";
import { unit } from "../Home.types";
import { IntakeContext } from "../../../context/Intake.context";
import Toast from 'react-native-toast-message';

type ChangeSelectButtonProps = {
  targetSelection: string;
};

const ChangeSection = () => {
  const { intakeTrack, selected, setSelected } = useContext(IntakeContext);
  const selectedString = intakeTrack[selected].unitName;

  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'This feature will be coming soon! 👋',
    });
  }

  const changeSelected = async (newSelected: number) => {
    setSelected(newSelected);
    AsyncStorage.setItem("last-selected", newSelected.toString());
  };

  // console.log('from section', intakeTrack);
  const ChangeSelectButton = ({ targetSelection }: ChangeSelectButtonProps) => {
    const capitalized =
      targetSelection.charAt(0).toUpperCase() +
      targetSelection.slice(1, targetSelection.length);

    return (
      <TouchableOpacity
        style={styles.changeSelectionButton}
        onPress={() =>
          changeSelected(
            intakeTrack.findIndex((item) => item.unitName === targetSelection),
          )
        }
      >
        <Text>{capitalized}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer} >
      {intakeTrack.map((item, index) => {
        return item.unitName === selectedString ? (
          <Animated.View
            key={index}
            style={styles.mapItem}
            entering={FlipInEasyX}
            exiting={FlipOutEasyX}
          >
            <Text style={styles.mapItemText}>
              {selectedString.charAt(0).toUpperCase() +
                selectedString.slice(1, selectedString.length)}
            </Text>
          </Animated.View>
        ) : (
          <ChangeSelectButton key={index} targetSelection={item.unitName} />
        );
      })}
      <TouchableOpacity onPress={showToast}>
        <Text style={styles.addSelectionButton}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "70%",
    alignSelf: "center",
  },
  changeSelectionButton: { paddingVertical: 5, paddingHorizontal: 10 },
  mapItem: {
    backgroundColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  mapItemText: { fontWeight: "600", color: "#fff" },
  addSelectionButton: { padding: 5, marginLeft: 10, fontWeight: "500" },
})

export default ChangeSection;
