import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../../colors";
import PressableButton from "../../components/PressableButton";
import { writePostToDB } from "../../firebase/firestoreHelper";
import ImagePickManager from "../../components/ImagePickManager";
import { auth } from "../../firebase/firebase-setup";
import LocationManager from "../../components/LocationManager";
export default function PostAdd({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const handleImageDelete = useCallback((index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, [images]);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid title and a description.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      await writePostToDB({
        title: title,
        description: description,
        images: images,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        location: location
      });
    } catch (error) {
      // console.log(error.message);
    }

    // reset state
    setTitle('');
    setDescription('');
    setIsValid(true);
    setImages([]);
    setLocation(null);
    navigation.goBack();
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setIsValid(true);
    setImage(null);
    setLocation(null);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    if (!isValid) {
      setIsValid(true);
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
    if (!isValid) {
      setIsValid(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Write your post title"
        />
      </View>
      {!isValid && !title && (
        <Text style={styles.errorMessage}>Please enter a valid title</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.content}
          value={description}
          onChangeText={handleDescriptionChange}
          placeholder="Write your post content"
        />
      </View>
      {!isValid && !description && (
        <Text style={styles.errorMessage}>
          Please enter a valid description
        </Text>
      )}
      <View style={{ alignSelf: "left" }}>
        <LocationManager sendLocation={setLocation} currentLocation={null} />
      </View>
      <ImagePickManager
        images={images}
        setImages={setImages}
        handleImageDelete={handleImageDelete}
      />

      <View style={styles.bottomContainer}>
        <PressableButton
          buttonPressed={handleSubmit}
          customizedStyle={[styles.button]}
        >
          <Text style={styles.buttonText}>Post it!</Text>
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
    // width: '80%',
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
    // fontWeight: 'bold',
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
