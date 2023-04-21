import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase-setup";
import Avatar from "../../assets/avatar.png";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

function formatDate(date) {
  const now = Date.now();
  const dValue = now - date;
  if (dValue < 1000 * 60) {
    return "Just now";
  } else if (dValue >= 1000 * 60 && dValue < 1000 * 60 * 60) {
    return Math.ceil(dValue / 1000 / 60) + " min.";
  } else if (dValue >= 1000 * 60 * 60 && dValue < 1000 * 60 * 60 * 24) {
    return Math.ceil(dValue / 1000 / 60 / 60) + " h.";
  } else if (dValue >= 1000 * 60 * 60 * 24) {
    return Math.ceil(dValue / 1000 / 60 / 60 / 24) + " d.";
  }
}

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [type, setType] = useState(0);

  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "posts"),
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          setComments([]);
        } else {
          const fetchedComments = [];
          for (let i = 0; i < querySnapshot.docs.length; i++) {
            const postData = querySnapshot.docs[i].data();
            for (let j = 0; j < (postData.comments || []).length; j++) {
              const queryUsersSnapshot = await getDocs(
                collection(firestore, "users")
              );
              let user;
              queryUsersSnapshot.forEach((doc) => {
                if (doc.data().uid === postData.comments[j].userId) {
                  user = doc.data();
                }
              });
              fetchedComments.push({
                ...postData.comments[j],
                post: postData,
                userPicture: user && user.photoURL,
              });
            }
          }
          const filterComments = fetchedComments.filter((comment) => {
            return type
              ? comment.post.userId === auth.currentUser.uid
              : comment.userId === auth.currentUser.uid;
          });
          setComments(filterComments);
        }
      }
    );

    return () => unsubscribe();
  }, [type]);

  const toPostDetail = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  const chooseType = () => {
    const options = ["My Comments", "Received Comments", "Cancel"];

    showActionSheetWithOptions(
      {
        options,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            setType(0);
            break;
          case 1:
            setType(1);
            break;
          case 2:
          // Canceled
        }
      }
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => chooseType()}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              {type ? "Received Comments" : "My Comments"}
            </Text>
            <Ionicons name="arrow-down-sharp" size={20} color={colors.white} />
          </View>
        </TouchableOpacity>
        <View></View>
      </View>
      <View style={styles.container}>
        {comments.map((comment, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toPostDetail(comment.post)}
          >
            <View style={styles.item}>
              <Image
                source={
                  comment.userPicture ? { uri: comment.userPicture } : Avatar
                }
                style={styles.avatar}
              />
              <View>
                <Text>{comment.userName || comment.userEmail}</Text>
                <View style={styles.contentWrapper}>
                  <Text style={styles.content}>{comment.content}</Text>
                  <Text style={styles.date}>{formatDate(comment.date)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 100,
    padding: 15,
    backgroundColor: colors.primary,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    padding: 20,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  content: {
    color: "#606060",
  },
  date: {
    color: "#606060",
    marginLeft: 20,
    fontSize: 12,
  },
});
