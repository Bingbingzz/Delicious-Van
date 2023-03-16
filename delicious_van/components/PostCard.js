import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const defaultImage = 'https://ibb.co/rkgFFC8';

export default function PostCard({ post }) {
    const { title, imageUrl } = post;
    const displayImage = imageUrl || defaultImage;

    return (
        <View style={styles.card}>
            <Image source={{ uri: displayImage }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
