import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '../../colors'
import PressableButton from '../../components/PressableButton'
import { writePostToDB } from '../../firebase/firestoreHelper'

export default function PostAdd({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isValid, setIsValid] = useState(true);
    //TODO: User add picture
    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Invalid Input', 'Please enter a valid title and a description.', [{ text: 'OK' }]);
            return;
        }

        try {
            writePostToDB({ title: title, description: description });

        } catch (error) {
            console.log(error.message);
        }
        navigation.goBack();

    };
    const handleReset = () => {
        setTitle('');
        setDescription('');
        setIsValid(true);
    };

    const handleTitleChange = (text) => {
        setTitle(text);
        if (!isValid) {
            setIsValid(true);
        }
    };

    const handleDescriptionChange = (text) => {
        setDescription(text);
        if (!isValid) {
            setIsValid(true);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={handleTitleChange}
                />
            </View>
            {!isValid && !title && (
                <Text style={styles.errorMessage}>Please enter a valid title</Text>
            )}
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={handleDescriptionChange}
                />
            </View>
            {!isValid && !description && (
                <Text style={styles.errorMessage}>Please enter a description</Text>
            )}
            <View style={styles.buttonsContainer}>
                <PressableButton
                    buttonPressed={handleReset}
                    customizedStyle={[styles.button]}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </PressableButton>
                <PressableButton
                    buttonPressed={handleSubmit}
                    customizedStyle={[styles.button]}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </PressableButton>
            </View>
        </View>
    );
};

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
});

