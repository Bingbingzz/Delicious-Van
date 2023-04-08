import React, { useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PressableButton from "./PressableButton";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { IconButton, MD3Colors } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function CameraManager({ navigation }) {
  let camera;
  const route = useRoute();

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    route.params.sendPhoto(photo);
    navigation.goBack();
  };

  return (
    <Camera
      ref={(r) => {
        camera = r;
      }}
      type={CameraType.back}
      style={styles.camera}
    >
      <IconButton
        icon="camera"
        iconColor="white"
        size={50}
        style={styles.takePhotoBtn}
        onPress={takePicture}
      />
    </Camera>
  );
}

export default CameraManager;

const styles = StyleSheet.create({
  camera: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 99,
  },
  takePhotoBtn: {
    position: "absolute",
    top: windowHeight - 200,
    left: windowWidth / 2 - 35,
  },
});
