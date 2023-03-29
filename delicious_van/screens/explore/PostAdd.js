import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../colors";
import PressableButton from "../../components/PressableButton";
import { writePostToDB } from "../../firebase/firestoreHelper";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PostAdd({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [images, setImages] = useState([]);

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
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
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
      });
    } catch (error) {
      console.log(error.message);
    }
    navigation.goBack();
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setIsValid(true);
    setImage(null);
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
      <View style={styles.photosContainer}>
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
          <TouchableOpacity onPress={handleImageSelect}>
            <View style={styles.uploadBtn}>
              <Icon name="add" size={20} color={colors.gray} />
            </View>
          </TouchableOpacity>
        </View>
        {/*<PressableButton*/}
        {/*    buttonPressed={handleReset}*/}
        {/*    customizedStyle={[styles.button]}*/}
        {/*>*/}
        {/*    <Text style={styles.buttonText}>Reset</Text>*/}
        {/*</PressableButton>*/}
      </View>
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

  photosContainer: {
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

  bottomContainer: {
    width: "100%",
  },
});
