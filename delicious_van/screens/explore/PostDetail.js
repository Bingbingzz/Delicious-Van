import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActionSheetIOS,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PressableButton from "../../components/PressableButton";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu } from "react-native-paper";
import {
  deletePostFromDB,
  getPostFromDB,
  updatePostInDB,
} from "../../firebase/firestoreHelper";
import { auth } from "../../firebase/firebase-setup";
import colors from "../../colors";
import Avatar from "../../assets/avatar.png";
import { KeyboardShift } from "../../components/KeyboardShift";
import { MAPS_API_KEY } from "@env";
import RestaurantSearch from '../../components/RestaurantSearch';

const defaultImage = "https://i.ibb.co/JtS24qP/default-image.jpg";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function PostDetail({ route }) {
  const { post } = route.params;
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [postData, setPostData] = useState(post);
  const { title, imageUrls, description, id, userId, userEmail, location, business } = postData;
  const displayImage = (imageUrls && imageUrls[0]) || defaultImage;
  const [mapImageKey, setMapImageKey] = useState(0);

  const fetchPostData = async () => {
    const updatedPost = await getPostFromDB(id);
    if (updatedPost) {
      setPostData(updatedPost);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPostData();
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setMapImageKey((prevKey) => prevKey + 1);
  }, [location]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        userId === auth.currentUser.uid && (
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
    setMenuVisible(false);
    Alert.alert("Do you want to delete this post?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deletePostFromDB(id);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleEditItem = () => {
    setMenuVisible(false);
    navigation.navigate("PostEdit", { post });
  };

  const sendComment = () => {
    // create new comment
    const newComment = {
      userEmail: auth.currentUser.email,
      userId: auth.currentUser.uid,
      content: comment,
      date: Date.now(),
    };
    // add the new comment to post comment list
    if (postData.comments) {
      postData.comments.push(newComment);
    } else {
      postData.comments = [newComment];
    }
    // update post
    updatePostInDB(id, postData).then(() => {
      setPostData({ ...postData });
      // reset comment input
      setComment("");
    });
  };

  const likeComment = () => {
    if (postData.likes && postData.likes.includes(auth.currentUser.uid)) {
      // remove user from post like list
      postData.likes = postData.likes.filter(
        (item) => item !== auth.currentUser.uid
      );
    } else {
      // add user to post like list
      if (postData.likes) {
        postData.likes.push(auth.currentUser.uid);
      } else {
        postData.likes = [auth.currentUser.uid];
      }
    }
    // update post
    updatePostInDB(id, postData).then(() => {
      setPostData({ ...postData });
    });
  };

  const deleteComment = (index) => {
    Alert.alert("Do you want to delete this comment?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          postData.comments.splice(index);
          // update post
          updatePostInDB(id, postData).then(() => {
            setPostData({ ...postData });
          });
        },
      },
    ]);
  };

  return (
    <KeyboardShift>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image source={Avatar} style={styles.avatar} />
            <Text style={styles.email}>{userEmail}</Text>
          </View>
          <Image source={{ uri: displayImage }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.title}>Location</Text>
          {
            business && (
              <View style={styles.businessDetails}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Text style={styles.businessAddress}>{business.location.address1}</Text>
              </View>
            )
          }
          {location && (
            <Image
              key={mapImageKey}
              source={{
                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
              }}
              style={{ width: "100%", height: 200 }}
            />
          )}


          <View style={styles.bottom}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={comment}
                placeholder="Say something here"
                onChangeText={(newComment) => {
                  setComment(newComment);
                }}
              />

              <TouchableOpacity onPress={sendComment}>
                <Icon name="send" size={24} color="#b1b1b1" />
              </TouchableOpacity>
            </View>
            <View customizedStyle={styles.button}>
              <TouchableOpacity onPress={likeComment}>
                <View style={styles.likeWrapper}>
                  {postData.likes &&
                    postData.likes.includes(auth.currentUser.uid) ? (
                    <Icon name="favorite" size={24} color="#fe2542" />
                  ) : (
                    <Icon name="favorite-border" size={24} />
                  )}
                  {postData.likes && postData.likes.length > 0 && (
                    <Text style={styles.badge}>{postData.likes.length}</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.commentsList}>
            {postData.comments &&
              postData.comments.map((comment, index) => (
                <View key={index} style={styles.commentItem}>
                  <View>
                    <Text>{comment.userEmail}</Text>
                    <Text style={styles.commentDate}>
                      {new Date(comment.date).toLocaleString()}
                    </Text>
                  </View>
                  <View>
                    <Text>{comment.content}</Text>
                  </View>
                  <View style={styles.commentActions}>
                    {comment.userId === auth.currentUser.uid && (
                      <TouchableOpacity onPress={() => deleteComment(index)}>
                        <Icon name="close" size={18} color="#c75450" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // minHeight: windowHeight,
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
    width: "100%",
    height: windowHeight * 0.5,
    resizeMode: "cover",
    borderRadius: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    marginRight: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    // padding: 16,
  },

  email: {
    fontSize: 20,
    fontWeight: "bold",
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
    alignItems: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 50,
  },

  input: {
    width: windowWidth / 2,
  },

  commentsList: {
    marginVertical: 20,
  },

  commentItem: {
    position: "relative",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#e1e1e1",
    marginBottom: 10,
  },

  commentDate: {
    fontSize: 13,
    color: "#b1b1b1",
    marginTop: 4,
    marginBottom: 5,
  },

  likeWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },

  badge: {
    // width: 15,
    // height: 15,
    // backgroundColor: "red",
    // color: "white",
    // textAlign: "center",
    // lineHeight: 15,
    // borderRadius: 15,
    // position: "absolute",
    // right: -5,
    // top: -5,
    // fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },

  commentActions: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  businessDetails: {
    marginTop: 10,
  },

  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  businessAddress: {
    fontSize: 14,
    color: 'gray',
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
