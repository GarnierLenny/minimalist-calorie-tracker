import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { customButtonIconProps } from "../../screens/Home/Home.types";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButtonIcon = ({pressCallback, iconName, iconSize, paddingInc = 0, disabled = false}: customButtonIconProps) => {
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
          top: 5,
        }}>
        <Icon name={iconName} size={iconSize} color='rgba(255, 255, 255, 0.4)' />
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
        <Icon name={iconName} size={iconSize} />
      </TouchableOpacity>
    </SafeAreaView>
  )
};

export default CustomButtonIcon;
