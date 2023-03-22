import { View, Text, StyleSheet } from 'react-native';
import PressableButton from '../../components/PressableButton';
import React from 'react';
import colors from '../../colors';
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.buttonsContainer}>
          <PressableButton
            customizedStyle={styles.button}
            buttonPressed={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Register</Text>
          </PressableButton>
          <PressableButton
            customizedStyle={styles.button}
            buttonPressed={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </PressableButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    width: '80%',
  },
  window: {
    width: '80%',
    height: 300,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    width: 100, // added width style to fix the length of the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
