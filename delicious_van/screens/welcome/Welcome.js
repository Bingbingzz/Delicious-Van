import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import PressableButton from '../../components/PressableButton';
import React from 'react';
import colors from '../../colors';

export default function Welcome({ navigation }) {
  return (
    <ImageBackground source={require('../../assets/delicious_food.jpeg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.window}>
            <Text style={styles.title}>Welcome to Delicious Van!</Text>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    width: '80%',
  },
  window: {
    width: '80%',
    height: 200,
    backgroundColor: 'rgba(238, 238, 238, 0.7)',
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
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
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
