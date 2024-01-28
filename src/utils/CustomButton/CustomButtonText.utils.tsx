import { useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { customButtonTextrops } from "../../screens/Home/Home.types";

const CustomButtonText = ({
  pressCallback,
  textContent,
  paddingInc = 0,
  disabled = false,
}: customButtonTextrops) => {
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SafeAreaView
        style={{...styles.backLayerContainer,
          paddingVertical: 16 + paddingInc,
          paddingHorizontal: 11 + paddingInc,
          top: paddingInc !== 0 ? 5 : 10
        }}
      >
        <Text style={styles.backLayerText} >
          {textContent}
        </Text>
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
        <Text style={styles.frontLayerText}>{textContent}</Text>
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
  },
  backLayerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
  },
  frontLayerContainer: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    display: "flex",
    zIndex: 1,
    alignItems: "center",
  },
  frontLayerText: { fontSize: 20, fontWeight: "500" },
});

export default CustomButtonText;
