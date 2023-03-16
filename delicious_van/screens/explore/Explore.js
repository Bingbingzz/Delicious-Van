import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PressableButton from '../../components/PressableButton';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons from expo vector-icons library
import colors from '../../colors';
const Stack = createNativeStackNavigator();

export default function Explore({ navigation }) {
  // add a custom component to the header for the "Add" button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          customizedStyle={styles.button}
          buttonPressed={() => navigation.navigate('PostAdd')}
        >
          <Ionicons name="add" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: 10, // add some margin to the right side of the button
    backgroundColor: colors.secondary,
    borderRadius: 50,
    height: 40,
    width: 40, // set the width and height of the button to 40 units to make it square
    justifyContent: 'center',
    alignItems: 'center',
  },
});
