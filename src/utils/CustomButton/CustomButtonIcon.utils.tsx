import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { customButtonIconProps } from "../../screens/Home/Home.types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomButtonIcon = ({
  pressCallback,
  iconName,
  iconSize,
  paddingInc = 0,
  disabled = false,
}: customButtonIconProps) => {
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SafeAreaView
        style={{...styles.backLayerContainer,
          paddingHorizontal: 11 + paddingInc,
          paddingVertical: 16 + paddingInc
        }}
      >
        <Icon
          name={iconName}
          size={iconSize}
          color="rgba(255, 255, 255, 0.4)"
        />
      </SafeAreaView>
      <TouchableOpacity
        disabled={disabled}
        style={{...styles.frontLayerContainer,
          borderColor: pressed ? "#fff" : "#000",
          paddingVertical: 15 + paddingInc,
          paddingHorizontal: 10 + paddingInc
        }}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={pressCallback}
      >
        <Icon name={iconName} size={iconSize} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: { display: "flex", justifyContent: "center" },
  backLayerContainer: {
    position: "absolute",
    backgroundColor: "#000",
    borderRadius: 10,
    zIndex: -1,
    top: 5,
  },
  frontLayerContainer: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    display: "flex",
    zIndex: 1,
    alignItems: "center",
  },
});

export default CustomButtonIcon;
