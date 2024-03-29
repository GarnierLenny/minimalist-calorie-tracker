import React, { useContext, useState } from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import IconButton from "../../../utils/IconButton/IconButton.component";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import { formatDate } from "../../../utils/formatDate";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IntakeContext } from "../../../context/Intake.context";

const DateSection = () => {
  const {date, setDate} = useContext(IntakeContext);
  const [referenceDate] = useState<string>(formatDate(date));
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  let maxDate = new Date();

  maxDate.setDate(maxDate.getDate() - 1);
  const changeDateHandler = (increment: number) => {
    setDate((oldDate: Date) => {
      const newDate = new Date(oldDate);

      newDate.setDate(newDate.getDate() + increment);
      return newDate;
    });
  };

  return (
    <SafeAreaView style={{width: '100%'}}>
      <Image
        source={require('../../../assets/mct_nobg.png')}
        style={{ width: 70, height: 70, alignSelf: 'center'}}
      />
      <SafeAreaView style={styles.dateContainer}>
        <IconButton
          name="less-than"
          size={26}
          callback={() => changeDateHandler(-1)}
        />
        <Modal
          isVisible={modalVisible}
          avoidKeyboard={true}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          style={styles.popup}
        >
          <Calendar
            enableSwipeMonths={true}
            style={styles.calendar}
            maxDate={maxDate.toString()}
            onDayPress={(day) => {
              const newDate = new Date(day.dateString);
              setDate(newDate);
              setModalVisible(false);
            }}
          />
          <SafeAreaView>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text
                style={styles.closeButtonText}
              >
                CLOSE
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.dateTextContainer}
        >
          <Text style={styles.dateText}>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </Text>
        </TouchableOpacity>
        <IconButton
          color="#000"
          disabled={formatDate(date) === referenceDate ? true : false}
          name="greater-than"
          size={26}
          callback={() => changeDateHandler(+1)}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    // backgroundColor: '#a20',
    top: '5%',
    alignItems: "center",
    flexDirection: "row",
    width: "57%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  dateText: {
    fontSize: 20,
    fontWeight: '500',
  },
  calendar: {
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  closeButton: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  dateTextContainer: {
    // backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  popup: { borderRadius: 20 },
  closeButtonText: {
    color: "#1E90FF",
    fontSize: 15,
    zIndex: 23,
    marginRight: 16,
    paddingVertical: 13,
  },
});

export default DateSection;
