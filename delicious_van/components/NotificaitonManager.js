import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import colors from "../colors";
import * as Notifications from "expo-notifications";

export default function NotificaitonManager() {
    async function verifyPermission() {
        const permissionResponse=await Notifications.getPermissionsAsync();
        console.log(permissionResponse);

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
  async function scheduleNotificationHandler() {
    const hasPermission = await verifyPermission();
    if(!hasPermission){
        Alert.alert("You need to give notification permission");
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Find some food:",
        body: "View more recommendations!",
      },
      trigger: {hour: 16, minute:0, repeats: true },
    });
  }
  return (
    <View>
      <Button title="Schedual a notification" onPress={scheduleNotificationHandler}/>
    </View>
  );
}
const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 16,
    },
  });
  