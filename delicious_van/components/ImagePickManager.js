import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../colors";
import React from "react";
import PressableButton from "./PressableButton";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

function ImagePickManager({
  images,
  setImages,
  handleImageDelete,
  navigation,
}) {
  const { showActionSheetWithOptions } = useActionSheet();

  const ImagePreview = ({ uri, onDelete }) => (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      <PressableButton
        customizedStyle={styles.deleteIcon}
        buttonPressed={onDelete}
      >
        <Text style={styles.deleteIconText}>x</Text>
      </PressableButton>
    </View>
  );

  const openActionSheet = () => {
    const options = ["From Photos", "From Camera", "Cancel"];

    showActionSheetWithOptions(
      {
        options,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // Save
            handleImageSelect();
            break;

          case 1:
            // Delete
            navigation.navigate("CameraManager", { sendPhoto: sendPhoto });
            break;

          case 2:
          // Canceled
        }
      }
    );
  };

  const sendPhoto = (photo) => {
    console.log(photo);
    setImages((prevImages) => [...prevImages, photo.uri]);
  };

  const handleImageSelect = async () => {
    if (images.length === 9) {
      alert("You can only upload up to 9 images!");
      return;
    }

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
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.photosTitle}>Add photos</Text>
      <View style={styles.photosListWrapper}>
        {images.length > 0 && (
          <FlatList
            style={styles.photosList}
            data={images}
            renderItem={({ item, index }) => (
              <ImagePreview
                uri={item}
                onDelete={() => handleImageDelete(index)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        )}
        <TouchableOpacity onPress={openActionSheet}>
          <View style={styles.uploadBtn}>
            <Icon name="add" size={20} color={colors.gray} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(ImagePickManager);

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    justifyContent: "flex-start",
    marginTop: 16,
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  photosListWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  photosList: {
    flexGrow: 0,
  },
  uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.gray,
    borderRadius: 10,
  },
  imagePreviewContainer: {
    position: "relative",
    marginRight: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },

  deleteIcon: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteIconText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
