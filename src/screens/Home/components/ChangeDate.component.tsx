import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import IconButton from "../../../utils/IconButton/IconButton.component";
import styles from "../Home.styles";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import { formatDate } from "../../../utils/formatDate";
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type DateSectionProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateSection = ({date, setDate}: DateSectionProps) => {
  const rotateX = useSharedValue(0);
  const [referenceDate] = useState<string>(formatDate(date));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

  const changeDateHandler = (increment: number) => {
    setDate((oldDate: Date) => {
      const newDate = new Date(oldDate);

      newDate.setDate(newDate.getDate() + increment);
      return newDate;
    })
  }

  return (
    <SafeAreaView style={styles.dateContainer}>
      <IconButton name="arrow-left-bold-circle" size={25} callback={() => changeDateHandler(-1)} />
      <Modal
        isVisible={modalVisible}
        avoidKeyboard={true}
        animationIn='slideInDown'
        animationOut='slideOutUp'
        style={{borderRadius: 20}}
      >
        <Calendar
        enableSwipeMonths={true}
        style={{paddingTop: 20, paddingBottom: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
        maxDate={maxDate.toString()}
        onDayPress={(day) => {
          const newDate = new Date(day.dateString);
          setDate(newDate);
          setModalVisible(false);
        }}
        />
        <SafeAreaView>
          <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(false)} style={{borderBottomRightRadius: 5, borderBottomLeftRadius: 5, alignItems: 'flex-end', backgroundColor: '#fff'}}>
            <Text style={{color: '#1E90FF', fontSize: 17, zIndex: 23, marginRight: 16, paddingVertical: 13}}>CLOSE</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10}}>
        <Text style={styles.dateText}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
      </TouchableOpacity>
      <IconButton color='#000' disabled={formatDate(date) === referenceDate ? true : false} name="arrow-right-bold-circle" size={25} callback={() => changeDateHandler(+1)} />
    </SafeAreaView>
  );
};

export default DateSection;
