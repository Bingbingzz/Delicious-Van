import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Image } from 'react-native';
import colors from '../../colors';
import PressableButton from '../../components/PressableButton';
import * as ImagePicker from 'expo-image-picker';
import { updatePostInDB } from '../../firebase/firestoreHelper';
export default function PostEdit({ route, navigation }) {
    const { post } = route.params;
    const { title, imageUrls, description, id } = post;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [images, setImages] = useState(imageUrls);
    const [newPost, setNewPost] = useState(post)

    const handleImageSelect = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImages((prevImages) => [...prevImages, result.assets[0].uri]);
        }
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const ImagePreview = ({ uri, onDelete }) => (
        <View style={styles.imagePreviewContainer}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            <PressableButton customizedStyle={styles.deleteIcon} buttonPressed={onDelete}>
                <Text style={styles.deleteIconText}>x</Text>
            </PressableButton>
        </View>
    );

    const handleSave = () => {
        setNewPost({ title: newTitle, description: newDescription, imageUrls: images })
        updatePostInDB(id, newPost)
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={newTitle}
                    onChangeText={setNewTitle}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={newDescription}
                    onChangeText={setNewDescription}
                />
            </View>
            {images.length > 0 && (
                <FlatList
                    data={images}
                    renderItem={({ item, index }) => (
                        <ImagePreview uri={item} onDelete={() => handleImageDelete(index)} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                />
            )}

            <View style={styles.buttonsContainer}>
                <PressableButton buttonPressed={handleImageSelect}>
                    <Text>Upload Image</Text>
                </PressableButton>
                <PressableButton
                    buttonPressed={handleSave}
                    customizedStyle={[styles.button]}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </PressableButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.backgroundColor,
        alignItems: 'center',

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    title: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    input: {
        height: 40,
        borderColor: colors.gray,
        borderWidth: 1,
        padding: 8,
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '60%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
        width: '80%',
    },
    button: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 5,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        padding: 10,

    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
    },
    imagePreviewContainer: {
        position: 'relative',
        marginRight: 10,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },

    deleteIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    deleteIconText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },

});

