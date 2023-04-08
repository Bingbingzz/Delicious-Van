import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from 'delicious_van/firebase/firebase-setup.js'
import PressableButton from '../../components/PressableButton';
import colors from '../../colors';
export default function Login({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const loginHandler = async () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };
  const signUpHandler = () => {
    navigation.replace("SignUp")
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(newEmail) => { setEmail(newEmail) }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(newPassword) => { setPassword(newPassword) }}
      />
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={loginHandler}
      >
        <Text style={styles.buttonText}>Login</Text>
      </PressableButton>
      <PressableButton
        customizedStyle={styles.button}
        buttonPressed={signUpHandler}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </PressableButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    width: 100, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
