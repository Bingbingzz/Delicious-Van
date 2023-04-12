import {View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import colors from "../../colors";
import PressableButton from "../../components/PressableButton";
import { auth } from "../../firebase/firebase-setup";
import {updateUserInDB} from "../../firebase/firestoreHelper";

const windowWidth = Dimensions.get("window").width;

export default function ProfileEdit() {
  console.log(auth.currentUser);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(auth.currentUser.email);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('Male');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const submitEdit = async () => {
    if (!username || !email || !location) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid username, email and a location.",
        [{ text: "OK" }]
      );
      return;
    }
    // auth.currentUser.updateProfile()
    // await updateUserInDB(auth.currentUser.uid, username, email, location, gender);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={handleLocationChange}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Gender</Text>
        <View style={styles.itemWrapper}>
          <TouchableOpacity onPress={() => setGender('Male')}>
            <View style={{...styles.item, ...{ backgroundColor: gender === 'Male' ? colors.buttonBackground : colors.white }}}>
              <Text style={styles.itemText}>Male</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Female')}>
            <View style={{...styles.item, ...{ backgroundColor: gender === 'Female' ? colors.buttonBackground : colors.white }}}>
              <Text style={styles.itemText}>Female</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Unknown')}>
            <View style={{...styles.item, ...{ backgroundColor: gender === 'Unknown' ? colors.buttonBackground : colors.white }}}>
              <Text style={styles.itemText}>Unknown</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={submitEdit}
      >
        <Text style={styles.buttonText}>Update</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: colors.white
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: colors.white
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 8,
    width: (windowWidth - 60) / 3,
    borderRadius: 10,
    height: 50,
  },
  itemText: {
    fontWeight: 'bold'
  }
});