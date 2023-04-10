import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
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
  const [visible, setVisible] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "posts"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
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

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/search-2.svg.png")}
      />
      <View style={styles.searchAndSortContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.search}
            placeholder="Search for delicious food"
            value={text}
            onChangeText={(txt) => {
              onSearch(txt);
              setText(txt);
            }}
          />
          {text == "" ? null : (
            <TouchableOpacity
              onPress={() => {
                setText("");
                onSearch("");
              }}
            >
              <Image
                style={styles.closeIcon}
                source={require("../assets/delete.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles.sortContainer}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Image
              style={styles.sortIcon}
              source={require("../assets/sort.png")}
            />
          </TouchableOpacity>
        </View>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.classificaitonContainer}>
          <View style={styles.sortClassificationContainer}>
            <TouchableOpacity
              style={styles.classificaiton}
              onPress={() => {
                setData(
                  data.sort(
                    (a, b) =>
                      b.likes.length +
                      b.comments.length -
                      a.likes.length -
                      a.comments.length
                  )
                );
                setVisible(false);
              }}
            >
              <Text style={styles.text}>Sort by hotest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.classificaiton}
              onPress={() => {
                setData(
                  data.sort(
                    (a, b) => b.time - a.time
                  )
                );
                setVisible(false);
              }}
            >
              <Text style={styles.text}>Sort by newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.classificaiton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.text}>Sort by nearest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.classificaiton, { borderBottomWidth: 0 }]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.text}>Sort by rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  searchAndSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  searchBarContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    height: 40,
    borderWidth: 0.2,
    marginLeft: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: colors.black,
  },
  image: {
    height: 20,
    width: 20,
    marginLeft: 30,
    top: 30,
  },
  search: {
    //position: "absolute",
    width: "76%",
    left: 40,
    right: 20,
    height: 30,
    borderRadius: 5,
  },
  sortIcon: {
    top: 5,
    width: 28,
    height: 28,
    opacity: 0.6,
    left: 10,
  },
  closeIcon: {
    height: 30,
    width: 30,
    //left: 300,
    opacity: 0.5,
    //ijustifyContent:'flex-end',
  },
  sortContainer: {
    marginRight: 20,
  },
  sortClassificationContainer: {
    width: "80%",
    height: 160,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  classificaiton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    paddingLeft: 20,
    borderBottomWidth: 0.5,
  },
  classificaitonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0.5)",
  },
});
