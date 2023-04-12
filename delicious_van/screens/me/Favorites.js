import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import {collection, onSnapshot} from "firebase/firestore";
import {auth, firestore} from "../../firebase/firebase-setup";
import colors from "../../colors";

const windowWidth = Dimensions.get("window").width;

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "posts"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setFavorites([]);
        } else {
          const fetchedFavorites = querySnapshot.docs.filter((doc) => (doc.data().likes || []).includes(auth.currentUser.uid)).map((doc) => ({ ...doc.data(), id: doc.id }));
          setFavorites(fetchedFavorites);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const toPostDetail = (post) => {
    navigation.navigate('PostDetail', { post })
  }
  console.log(favorites);
  
  return (
    <View style={styles.container}>
    {
      favorites.map((favorite) => (
        <TouchableOpacity key={favorite.id} onPress={() => toPostDetail(favorite)}>
          <View style={styles.item}>
            <Image source={{ uri: favorite.imageUrls[0] }} style={styles.image} />
            <Text style={styles.itemText}>{favorite.title}</Text>
          </View>
        </TouchableOpacity>
      ))
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 20,
    backgroundColor: colors.white
  },
  item: {
    marginBottom: 15
  },
  itemText: {
    width: (windowWidth - 60) / 2,
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    width: (windowWidth - 60) / 2,
    height: 200,
    borderRadius: 10,
  }
});