import React from 'react';
import {View, Text, Image, StyleSheet, Pressable, Alert} from 'react-native';
import {auth} from "../firebase/firebase-setup";

const defaultImage = 'https://i.ibb.co/JtS24qP/default-image.jpg';

export default function PostCard({ post, navigation }) {
    const { title, imageUrls } = post;
    const displayImage = (imageUrls && imageUrls[0]) || defaultImage;

    const toPostDetail = () => {
        if (auth.currentUser.displayName) {
            navigation.navigate('PostDetail', { post });
        } else {
            Alert.alert("You need to update your username in profile.");
        }
    }

    return (
        <View style={styles.card}>
            <Pressable onPress={toPostDetail}>
                <Image source={{ uri: displayImage }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 8,
        marginBottom: 16,
        elevation: 3,
        width: '45%',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    title: {
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
