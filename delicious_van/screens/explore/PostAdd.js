import { View, TextInput, StyleSheet, Text, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../../colors";
import PressableButton from "../../components/PressableButton";
import { writePostToDB } from "../../firebase/firestoreHelper";
import ImagePickManager from "../../components/ImagePickManager";
import { auth } from "../../firebase/firebase-setup";
import LocationManager from "../../components/LocationManager";
import RestaurantSearch from '../../components/RestaurantSearch';
import { ScrollView } from "react-native-gesture-handler";

export default function PostAdd({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add a new state variable for loading

  const handleImageDelete = useCallback(
    (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    },
    [images]
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
    if (!auth.currentUser.displayName) {
      Alert.alert("You need to update your username in profile.");
      navigation.navigate('ProfileEdit');
      return;
    }
    setIsLoading(true); // Set isLoading to true before sending data
    try {
      await writePostToDB({
        title: title,
        description: description,
        images: images,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        userName: (auth.currentUser.displayName && auth.currentUser.displayName.split("|")[0]),
        location: location,
        comments: [],
        likes: [],
        time: Date.now(),
        business: business,
      });
    } catch (error) {
      // console.log(error.message);
    }
    setTitle("");
    setDescription("");
    setIsValid(true);
    setImages([]);
    setLocation(null);
    setBusiness(null);
    setIsLoading(false); // Set isLoading to false after the process is finished
    navigation.goBack();
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setIsValid(true);
    setImages(null);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
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


          <View style={styles.restaurantSearchContainer}>
            <RestaurantSearch
              onBusinessSelect={(business) => {
                // Save the selected business to the post data
                setBusiness(business);
              }}
            />
            {business && (<View style={styles.selectedBusinessContainer}>
              <Text style={styles.selectedBusinessName}>{business.name}</Text>
              <Text style={styles.selectedBusinessAddress}>
                {business.location.address1}
              </Text>
            </View>)}
          </View>
          <View style={styles.location}>
            <LocationManager sendLocation={setLocation} currentLocation={null} />
          </View>
          <View style={styles.imagePickerContainer}>
            <ImagePickManager
              images={images}
              setImages={setImages}
              handleImageDelete={handleImageDelete}
              navigation={navigation}
            />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
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

  bottomContainer: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
  },
  location: {
    marginTop: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  imagePickerContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  restaurantSearchContainer: {
    marginTop: 10,
    width: '100%',
    marginBottom: 10,
  },

  selectedBusinessContainer: {
    marginTop: 10,
  },

  selectedBusinessName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  selectedBusinessAddress: {
    fontSize: 14,
  },
});
