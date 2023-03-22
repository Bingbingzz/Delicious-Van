import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const defaultImage = 'https://i.ibb.co/JtS24qP/default-image.jpg';

export default function PostCard({ post, navigation }) {
    const { title, imageUrls } = post;
    const displayImage = (imageUrls && imageUrls[0]) || defaultImage;

    return (
        <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('PostDetail', { post })}>
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
