import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const defaultImage = 'https://i.ibb.co/JtS24qP/default-image.jpg';

export default function PostDetail({ route }) {
  const { post } = route.params;
  const { title, imageUrls, description } = post;
  const displayImage = (imageUrls && imageUrls[0]) || defaultImage;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: displayImage }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  description: {
    fontSize: 16,
    padding: 16,
    paddingBottom: 32,
    lineHeight: 24,
  },
});
