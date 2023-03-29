import { View, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PressableButton from '../../components/PressableButton';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../colors';
import PostGallery from '../../components/PostGallery';

const Stack = createNativeStackNavigator();

export default function Explore({ navigation }) {
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
      <PostGallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  button: {
    marginRight: 10,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
