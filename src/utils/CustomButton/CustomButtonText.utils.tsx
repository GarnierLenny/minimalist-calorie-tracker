import { useState } from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { customButtonTextrops } from "../../screens/Home/Home.types";

const CustomButtonText = ({pressCallback, textContent, paddingInc = 0, disabled = false}: customButtonTextrops) => {
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <SafeAreaView style={{display: 'flex', justifyContent: 'center'}}>
      <SafeAreaView
        style={{
          position: 'absolute',
          backgroundColor: '#000',
          borderRadius: 10,
          paddingVertical: 16 + paddingInc,
          zIndex: -1,
          paddingHorizontal: 11 + paddingInc,
          top: paddingInc !== 0 ? 5 : 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: 'rgba(255, 255, 255, 0.4)'}}>{textContent}</Text>
      </SafeAreaView>
      <TouchableOpacity
      disabled={disabled}
      style={{
        borderWidth: 1,
        borderColor: pressed ? '#fff' : '#000',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 15 + paddingInc ,
        paddingHorizontal: 10 + paddingInc,
        display: 'flex',
        zIndex: 1,
        alignItems: 'center',
      }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={pressCallback}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{textContent}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
};

export default CustomButtonText;
