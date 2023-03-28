import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import PostCard from "./PostCard"; // Import the PostCard component
import { firestore } from "../firebase/firebase-setup";
import { useNavigation } from "@react-navigation/native";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import colors from "../colors";

export default function PostGallery({ txt }) {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const navigation = useNavigation();
  const [text, setText] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "posts"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setPosts([]);
          setData([]);
        } else {
          const fetchedPosts = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setData(fetchedPosts);
          setOldData(fetchedPosts);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <PostCard post={item} navigation={navigation} />
  );

  const onSearch = (text) => {
    if (text == "") {
      setData(oldData);
    } else {
      let tempList = data.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };
  console.log(text);
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search for delicious food"
          value={text}
          onChangeText={(txt) => {
            onSearch(txt);
            setText(txt);
          }}
        />
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gallery}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  gallery: {
    top: 30,
    padding: 8,
  },
  cardContainer: {
    flex: 7,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  search: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 10,
    height: 30,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
});
