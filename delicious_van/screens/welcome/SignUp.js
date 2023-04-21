import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "delicious_van/firebase/firebase-setup.js";
import PressableButton from "../../components/PressableButton";
import colors from "../../colors";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-setup";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signUpHandler = async () => {
    if (password !== confirmPassword) {
      Alert.alert("The passwords don't match");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(collection(firestore, "users"), user.providerData[0]).then(
          (res) => {
            console.log(res);
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert('Error', 'Invalid username or password', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(newPassword) => {
          setConfirmPassword(newPassword);
        }}
      />
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={signUpHandler}
      >
        <Text style={styles.buttonText}>Register</Text>
      </PressableButton>
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={loginHandler}
      >
        <Text style={styles.buttonText}>Already registered? Login</Text>
      </PressableButton>
      {/* <Button title='Register' onPress={signUpHandler} />
      <Button title='Already registered? Login' onPress={loginHandler} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
