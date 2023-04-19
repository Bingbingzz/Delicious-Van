import { View, Button, Alert, Text } from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import PressableButton from "./PressableButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import colors from "../colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function NotificationManager() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisibility] = useState(false);

  async function verifyPermission() {
    const permissionResponse = await Notifications.getPermissionsAsync();
    if (permissionResponse.granted) {
      return true;
    }
    try {
      const permissionResult = await Notifications.requestPermissionsAsync();
      return permissionResult.granted;
    } catch (err) {
      //console.log("permission request error ", err);
    }
  }

  async function handleNotificationSchedule() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give notification permission");
    }
    try {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Find some food:",
          body: "View more recommendations!",
        },
        trigger: {
          hour: hour,
          minute: minute,
          repeats: true,
        },
      });
      console.log(hour, minute);
      Alert.alert(
        "Notification scheduled at " + selectedDate.toLocaleTimeString([],{timeStyle: 'short'})
      );
    } catch (error) {
      console.log("Error scheduling notification: ", error);
      Alert.alert("Error scheduling notification");
    }
    hideDatePicker();
  }

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    handleNotificationSchedule();
  };

  function onDateChangeHandler(chosenDate) {
    const currentDate = chosenDate || selectedDate;
    setSelectedDate(currentDate);
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <View>
      <PressableButton
        customizedStyle={styles.scheduleButton}
        buttonPressed={showDatePicker}
      >
        <Text style={styles.scheduleButtonText}>Schedule a notification</Text>
      </PressableButton>
      <DateTimePickerModal
        textColor= '#F5793B'
        isVisible={datePickerVisible}
        mode="time"
        date={selectedDate}
        onChange={onDateChangeHandler}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = {
  scheduleButton: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  scheduleButtonText: {
    color: colors.primary,
    fontSize: 13,
  },
  
};
