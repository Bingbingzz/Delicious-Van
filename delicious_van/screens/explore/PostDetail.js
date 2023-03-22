import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActionSheetIOS } from 'react-native';
import PressableButton from '../../components/PressableButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { deletePostFromDB } from '../../firebase/firestoreHelper';

const defaultImage = 'https://i.ibb.co/JtS24qP/default-image.jpg';

export default function PostDetail({ route }) {
  const { post } = route.params;
  const { title, imageUrls, description, id } = post;
  const displayImage = (imageUrls && imageUrls[0]) || defaultImage;
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={menuVisible}
          onDismiss={handleMenuPress}
          anchor={
            <PressableButton
              customizedStyle={styles.button}
              buttonPressed={handleMenuPress}
            >
              <Ionicons name="menu-sharp" size={24} color="white" />
            </PressableButton>
          }
        >
          <Menu.Item onPress={handleDeleteItem} title="Delete Item" />
          <Menu.Item onPress={handleEditItem} title="Edit Item" />
        </Menu>
      ),
    });
  }, [navigation, menuVisible]);



  const handleMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDeleteItem = () => {
    deletePostFromDB(id);
    setMenuVisible(false);
    navigation.goBack();
  };

  const handleEditItem = () => {
    setMenuVisible(false);
    navigation.navigate('PostEdit', { post });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: displayImage }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  description: {
    fontSize: 16,
    padding: 16,
    paddingBottom: 32,
    lineHeight: 24,
  },
});
