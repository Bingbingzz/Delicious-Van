import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import PressableButton from "../../components/PressableButton";
import { auth } from "../../firebase/firebase-setup";
import colors from "../../colors";
import Avatar from "../../assets/avatar.png";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import NotificaitonManager from "../../components/NotificaitonManager";

export default function UserProfile() {
  const navigation = useNavigation();

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
      <View style={styles.top}>
        <Image source={Avatar} style={styles.avatar} />
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Profile</Text>
            <IconButton icon="chevron-right" iconColor="#c1c1c1" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(222)}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Comments</Text>
            <IconButton icon="chevron-right" iconColor="#c1c1c1" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(333)}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Favorites</Text>
            <IconButton icon="chevron-right" iconColor="#c1c1c1" />
          </View>
        </TouchableOpacity>
      </View>
      <NotificaitonManager />
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={LogoutHandler}
      >
        <Text style={styles.btnText}>Logout</Text>
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
  btnText: {
    color: colors.white,
  },
  top: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  email: {
    color: colors.primary,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  center: {
    width: '100%',
    padding: 40
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c8d6d7',
    marginBottom: 10,
  },
  itemText: {
    fontWeight: 'bold'
  }
});
