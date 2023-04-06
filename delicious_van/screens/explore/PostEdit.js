import React, { useCallback, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import colors from "../../colors";
import PressableButton from "../../components/PressableButton";
import { updatePostInDB } from "../../firebase/firestoreHelper";
import ImagePickManager from "../../components/ImagePickManager";
import LocationManager from "../../components/LocationManager";

export default function PostEdit({ route, navigation }) {
  const { post } = route.params;
  const { title, imageUrls, description, id, userId, userEmail, location } = post;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [images, setImages] = useState(imageUrls);
  const [newLocation, setNewLocation] = useState(location);
  const handleImageDelete = useCallback((index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, [images]);

  const handleSave = () => {
    const updatedPost = {
      title: newTitle,
      description: newDescription,
      imageUrls: images, userId, userEmail,
      location: newLocation,
    };
    updatePostInDB(id, updatedPost);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Write your post title"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.content}
          value={newDescription}
          onChangeText={setNewDescription}
          placeholder="Write your post content"
        />
      </View>
      <View style={{ alignSelf: "left" }}>
        <LocationManager sendLocation={setNewLocation} currentLocation={location} />
      </View>
      <ImagePickManager
        images={images}
        setImages={setImages}
        handleImageDelete={handleImageDelete}
      />
      <View style={styles.bottomContainer}>
        <PressableButton
          buttonPressed={handleSave}
          customizedStyle={[styles.button]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.pageContentBgColor,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "80%",
    marginTop: 10,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 50,
    width: "100%",
  },
  content: {
    height: 120,
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 12,
    width: "100%",
  },
  button: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 5,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // margin: 8,
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    // fontWeight: "bold",
    // fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
  },
  bottomContainer: {
    width: "100%",
  },
});
