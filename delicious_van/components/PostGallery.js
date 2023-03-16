import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PostCard from './PostCard'; // Import the PostCard component
import { firestore } from '../firebase/firebase-setup'
import {
    collection,
    getFirestore,
    onSnapshot
} from 'firebase/firestore';
export default function PostGallery() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "posts"), (querySnapshot) => {
            if (querySnapshot.empty) {
                setPosts([])
            } else {
                const fetchedPosts = querySnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setPosts(fetchedPosts);
            }
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => <PostCard post={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.gallery}
                numColumns={2}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gallery: {
        padding: 8,
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 4,
        marginBottom: 16,
    },
});


