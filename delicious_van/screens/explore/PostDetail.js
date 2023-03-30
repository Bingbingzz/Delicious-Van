import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActionSheetIOS, Dimensions, TextInput } from 'react-native';
import PressableButton from '../../components/PressableButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu } from 'react-native-paper';
import { deletePostFromDB, getPostFromDB } from '../../firebase/firestoreHelper';
import { auth } from '../../firebase/firebase-setup';
import colors from "../../colors";
import Avatar from "../../assets/avatar.png";

const defaultImage = 'https://i.ibb.co/JtS24qP/default-image.jpg';

const windowHeight = Dimensions.get('window').height;

export default function PostDetail({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false)
  const [postData, setPostData] = useState(post);
  const { title, imageUrls, description, id } = postData;
  const displayImage = (imageUrls && imageUrls[0]) || defaultImage;
  const fetchPostData = async () => {
    const updatedPost = await getPostFromDB(id);
    console.log(updatedPost)
    if (updatedPost) {
      setPostData(updatedPost);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPostData();
    });

    return unsubscribe;
  }, [navigation]);

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
              <Icon name="more-horiz" size={24} color="white" />
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={Avatar} style={styles.avatar} />
          <Text style={styles.email}>{auth.currentUser.email}</Text>
        </View>
        <Image source={{ uri: displayImage }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.bottom}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Say something here"
            />
          </View>
          <View
            customizedStyle={styles.button}
          >
            <Icon name="favorite-border" size={24} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: windowHeight,
    backgroundColor: colors.pageContentBgColor,
  },

  container: {
    flex: 1,
    backgroundColor: colors.pageContentBgColor,
    shadowColor: "#000",
    padding: 16,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  image: {
    width: '100%',
    height: windowHeight * 0.5,
    resizeMode: 'cover',
    borderRadius: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    marginRight: 5
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // padding: 16,
  },

  email: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    // padding: 16,
    paddingBottom: 20,
    lineHeight: 24,
    marginTop: 6,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  inputWrapper: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12
  }
});
