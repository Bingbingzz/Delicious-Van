
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Alert,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MAPS_API_KEY } from "@env";
import colors from "../colors";
import PressableButton from "./PressableButton";

export default function LocationManager({ sendLocation, currentLocation }) {
    const navigation = useNavigation();
    const route = useRoute();

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [permissionResponse, requestPermission] =
        Location.useForegroundPermissions();
    const [location, setLocation] = useState(currentLocation);

    useEffect(() => {
        if (route.params) {
            setLocation(route.params.selectedLocation);
        }
    }, [route]);
    async function verifyPermission() {
        if (permissionResponse.granted) {
            return true;
        }
        try {
            const permissionResult = await requestPermission();
            return permissionResult.granted;
        } catch (err) {
            console.log("permission request error ", err);
        }
    }
    async function locateUserHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            Alert.alert("You need to give access to the location services");
            return;
        }
        try {
            const result = await Location.getCurrentPositionAsync();
            setLocation({
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
            });
            sendLocation(location);
            setModalVisible(false);
        } catch (err) {
            console.log("locate user error ", err);
        }
    }
    function locationSelectHandler() {
        if (location) {
            navigation.navigate("LocationPicker", { currentLocation: location, sendLocation: sendLocation, postAddLocation: setLocation });
            setModalVisible(false);
        } else {
            navigation.navigate("LocationPicker", { currentLocation: location, sendLocation: sendLocation, postAddLocation: setLocation });
            setModalVisible(false);
        }
    }
    function locationSaveHandler() {
        sendLocation(location);
        setModalVisible(false);
    }
    return (
        <View>
            <TouchableOpacity onPress={toggleModal} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>Select Location</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <PressableButton
                        customizedStyle={styles.button}
                        buttonPressed={locateUserHandler}
                    >
                        <Text>Use My Current Location</Text>
                    </PressableButton>

                    <PressableButton
                        customizedStyle={styles.button}
                        buttonPressed={locationSelectHandler}
                    >
                        <Text>Let me choose!</Text>
                    </PressableButton>
                    {/* {location && (<PressableButton
                        customizedStyle={styles.button}
                        buttonPressed={locationSaveHandler}
                    >
                        <Text>Save Location!</Text>
                    </PressableButton>)} */}
                </View>
            </Modal>
            {(location ?
                (<Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
                    }}
                    style={styles.mapPreview}
                />) : (<Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${currentLocation.latitude},${currentLocation.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${currentLocation.latitude},${currentLocation.longitude}&key=${MAPS_API_KEY}`,
                    }}
                    style={styles.mapPreview}
                />)
            )}
        </View>
    );
}

const styles = {
    menuButton: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 10,
    },
    menuButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    button: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 5,
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    mapPreview: {
        width: 200,
        height: 150,
    }
}