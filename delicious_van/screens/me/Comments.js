import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-setup";
import Avatar from "../../assets/avatar.png";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "posts"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setComments([]);
        } else {
          const fetchedComments = querySnapshot.docs.flatMap((doc) => {
            return (doc.data().comments || []).map((item) => ({
              ...item,
              post: doc.data(),
            }));
          });
          setComments(fetchedComments);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const toPostDetail = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  return (
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
              <Text>{comment.userEmail}</Text>
              <View style={styles.contentWrapper}>
                <Text style={styles.content}>{comment.content}</Text>
                <Text style={styles.date}>{formatDate(comment.date)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
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
