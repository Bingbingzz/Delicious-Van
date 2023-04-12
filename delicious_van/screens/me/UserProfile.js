import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import PressableButton from "../../components/PressableButton";
import { auth } from "../../firebase/firebase-setup";
import colors from "../../colors";
import Avatar from "../../assets/avatar.png";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import {
  updateUserPictureInDB,
  uploadImage,
} from "../../firebase/firestoreHelper";
import NotificaitonManager from "../../components/NotificaitonManager";

export default function UserProfile() {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  const LogoutHandler = async () => {
    try {
      await auth.signOut();
      console.log("User signed out!");
      // Navigate to the login or welcome screen (if applicable) after successful logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const sendPhoto = async (photo) => {
    const url = await uploadImage(photo.uri);
    await updateUserPictureInDB(url);
  };

  const handleImageSelect = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const url = await uploadImage(result.assets[0].uri);
      await updateUserPictureInDB(url);
    }
  };

  const openActionSheet = () => {
    const options = ["From Photos", "From Camera", "Cancel"];

    showActionSheetWithOptions(
      {
        options,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            handleImageSelect();
            break;

          case 1:
            navigation.navigate("CameraManager", { sendPhoto: sendPhoto });
            break;

          case 2:
          // Canceled
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => openActionSheet()}>
          <Image
            source={
              auth.currentUser.photoURL
                ? { uri: auth.currentUser.photoURL }
                : Avatar
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Profile</Text>
            <IconButton icon="chevron-right" iconColor="#c1c1c1" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
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
    borderRadius: 100,
  },
  email: {
    color: colors.primary,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    width: "100%",
    padding: 40,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#c8d6d7",
    marginBottom: 10,
  },
  itemText: {
    fontWeight: "bold",
  },
});
