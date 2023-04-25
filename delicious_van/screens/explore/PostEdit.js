import React, { useCallback, useState } from "react";
import { View, TextInput, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import colors from "../../colors";
import PressableButton from "../../components/PressableButton";
import { updatePostInDB } from "../../firebase/firestoreHelper";
import ImagePickManager from "../../components/ImagePickManager";
import LocationManager from "../../components/LocationManager";
import RestaurantSearch from '../../components/RestaurantSearch';

export default function PostEdit({ route, navigation }) {
  const { post } = route.params;
  const { title, imageUrls, description, id, userId, userEmail, location, business } = post;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [images, setImages] = useState(imageUrls);
  const [newLocation, setNewLocation] = useState(location);
  const [newBusiness, setNewBusiness] = useState(business);
  const handleImageDelete = useCallback((index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, [images]);

  const handleSave = () => {
    if (!title || !description) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid title and a description.",
        [{ text: "OK" }]
      );
      return;
    }
    if (images.length === 0) {
      Alert.alert(
        "No Images",
        "Please upload at least one photo.",
        [{ text: "OK" }]
      );
      return;
    }
    const updatedPost = {
      title: newTitle,
      description: newDescription,
      imageUrls: images, userId, userEmail,
      location: newLocation,
      time: Date.now(),
      business: newBusiness,
    };
    updatePostInDB(id, updatedPost);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          <View style={styles.restaurantSearchContainer}>
            <RestaurantSearch
              onBusinessSelect={(business) => {
                setNewBusiness(business);
              }}
            />

            {newBusiness ? (
              <View style={styles.selectedBusinessContainer}>
                <Text style={styles.selectedBusinessName}>{newBusiness.name}</Text>
                <Text style={styles.selectedBusinessAddress}>
                  {newBusiness && newBusiness.location ? newBusiness.location.address1 : ""}
                </Text>

              </View>) : (business ? (<View style={styles.selectedBusinessContainer}>
                <Text style={styles.selectedBusinessName}>{business.name}</Text>
                <Text style={styles.selectedBusinessAddress}>
                  {business.location.address1}
                </Text>
              </View>) : (<></>))}
          </View>
          <View style={styles.location}>
            <LocationManager sendLocation={setNewLocation} currentLocation={location} />
          </View>
          <View style={styles.imagePickerContainer}>
            <ImagePickManager
              images={images}
              setImages={setImages}
              handleImageDelete={handleImageDelete}
            />
          </View>
          <View style={styles.bottomContainer}>
            <PressableButton
              buttonPressed={handleSave}
              customizedStyle={[styles.button]}
            >
              <Text style={styles.buttonText}>Save</Text>
            </PressableButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
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
    marginTop: 10,
    marginBottom: 8,
    alignItems: "flex-start",
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
    padding: 10,
  },
  buttonText: {
    color: colors.white,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
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
