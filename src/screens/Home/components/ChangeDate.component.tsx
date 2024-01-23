import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import IconButton from "../../../utils/IconButton/IconButton.component";
import styles from "../Home.styles";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import { formatDate } from "../../../utils/formatDate";

type DateSectionProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateSection = ({date, setDate}: DateSectionProps) => {
  const rotateX = useSharedValue(0);
  const [referenceDate] = useState<string>(formatDate(date));

  const animatedStyle = useAnimatedStyle(() => (
    {transform: [{ perspective: 500 }, { rotateX: `${rotateX.value}deg` }]}
  ));

  const changeDateHandler = (increment: number) => {
    setDate((oldDate: Date) => {
      const newDate = new Date(oldDate);

      rotateX.value = withTiming(90, { duration: 100, easing: Easing.linear }, () => {
        rotateX.value = withTiming(0, { duration: 100, easing: Easing.linear });
      });
      setTimeout(() => {
        newDate.setDate(newDate.getDate() + increment);
      }, 70);
      return newDate;
    })
  }

  return (
    <SafeAreaView style={styles.dateContainer}>
      <IconButton name="arrow-left-bold-circle" size={25} callback={() => changeDateHandler(-1)} />
      <SafeAreaView style={{backgroundColor: '#fff', borderRadius: 10}}>
        <Animated.View style={[{paddingHorizontal: 10, paddingVertical: 10}, animatedStyle]}>
          <Text style={styles.dateText}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
        </Animated.View>
      </SafeAreaView>
      <IconButton color='#000' disabled={formatDate(date) === referenceDate ? true : false} name="arrow-right-bold-circle" size={25} callback={() => changeDateHandler(+1)} />
    </SafeAreaView>
  );
};

export default DateSection;
