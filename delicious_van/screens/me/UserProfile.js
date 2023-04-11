import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PressableButton from "../../components/PressableButton";
import { auth } from "../../firebase/firebase-setup";
import colors from "../../colors";
import NotificaitonManager from "../../components/NotificaitonManager";
export default function UserProfile() {
  const LogoutHandler = async () => {
    try {
      await auth.signOut();
      console.log("User signed out!");
      // Navigate to the login or welcome screen (if applicable) after successful logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <NotificaitonManager/>
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={LogoutHandler}
      >
        <Text>Logout</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
});
