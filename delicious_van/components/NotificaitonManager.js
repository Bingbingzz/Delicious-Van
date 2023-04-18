import { View, Button, Alert } from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NotificationManager() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());

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
      const trigger = new Date();
      trigger.setHours(chosenDate.getHours());
      trigger.setMinutes(chosenDate.getMinutes());
      trigger.setSeconds(0);
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Find some food:",
          body: "View more recommendations!",
        },
        trigger: {
          date: trigger,
          repeats: true,
        },
      });
      Alert.alert("Notification scheduled at " + chosenDate.toLocaleTimeString());
    } catch (error) {
      console.log("Error scheduling notification: ", error);
      Alert.alert("Error scheduling notification");
    }
    setShowDatePicker(false);
  }

  function showDatePickerHandler() {
    setShowDatePicker(true);
  }

  function hideDatePickerHandler() {
    setShowDatePicker(false);
  }

  function onDateChangeHandler(event, selectedDate) {
    const currentDate = selectedDate || chosenDate;
    setChosenDate(currentDate);
  }

  function cancelNotificationTimeHandler() {
    setShowDatePicker(false);
    //setChosenDate(new Date());
  }

  return (
    <View>
      <Button title="Schedule a notification" onPress={showDatePickerHandler} />
      {showDatePicker && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={chosenDate}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onDateChangeHandler}
          />
          <Button title="Confirm" onPress={handleNotificationSchedule} />
          <Button title="Cancel" onPress={cancelNotificationTimeHandler} />
        </View>
      )}
    </View>
  );
}
