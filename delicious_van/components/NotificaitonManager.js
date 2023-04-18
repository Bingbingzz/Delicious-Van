import { View, Button, Alert, Text } from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "./PressableButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import colors from "../colors";

export default function NotificationManager() {
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function verifyPermission() {
    const permissionResponse = await Notifications.getPermissionsAsync();
    if (permissionResponse.granted) {
      console.log("permitted");
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
    console.log("here");
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give notification permission");
    }
    try {
      const trigger = new Date();
      console.log(trigger);
      trigger.setHours(chosenDate.getHours());
      trigger.setMinutes(chosenDate.getMinutes());
      trigger.setSeconds(0);
      console.log(trigger);
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
      console.log(date);
      Alert.alert(
        "Notification scheduled at " + chosenDate.toLocaleTimeString()
      );
    } catch (error) {
      console.log("Error scheduling notification: ", error);
      Alert.alert("Error scheduling notification");
    }
    setModalVisible(false);
  }

  function onDateChangeHandler(event, selectedDate) {
    const currentDate = selectedDate || chosenDate;
    setChosenDate(currentDate);
    console.log(chosenDate);
  }

  function cancelNotificationTimeHandler() {
    setModalVisible(false);
    //setChosenDate(new Date());
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.scheduleButton}>
        <Text style={styles.scheduleButtonText}>Schedule a notification</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <View style={styles.dateTimePickerContainer}>
            <DateTimePicker 
              testID="dateTimePicker"
              value={chosenDate}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onDateChangeHandler}
            />
          </View>
          <PressableButton
            customizedStyle={styles.button}
            onPress={handleNotificationSchedule}
          >
            <Text>Confirm</Text>
          </PressableButton>
          <PressableButton
            customizedStyle={styles.button}
            onPress={cancelNotificationTimeHandler}
          >
            <Text>Cancel</Text>
          </PressableButton>
        </View>
      </Modal>
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
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 5,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  dateTimePickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 50,
  },
};
