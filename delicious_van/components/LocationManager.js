

import { View, Image, Alert, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MAPS_API_KEY } from "@env";
import colors from "../colors";

export default function LocationManager({ sendLocation }) {
    const navigation = useNavigation();
    const route = useRoute();

    const [permissionResponse, requestPermission] =
        Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);
    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const data = await getUserInfo();
                setLocation(data.location);
            } catch (err) {
                console.log("fetch user info ", err);
            }
        }
        fetchUserInfo();
    }, []);
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
        } catch (err) {
            console.log("locate user error ", err);
        }
    }
    function locationSelectHandler() {
        // navigate to Map.js
        if (location) {
            navigation.navigate("LocationPicker", { currentLocation: location });
        } else {
            navigation.navigate("LocationPicker");
        }
    }
    function locationSaveHandler() {
        sendLocation(location);
    }
    return (
        <View>
            <PressableButton
                customizedStyle={styles.button}
                buttonPressed={locateUserHandler}
            >
                <Text>Use My Current Location</Text>
            </PressableButton>
            {location && (
                <Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
                    }}
                    style={{ width: "100%", height: 200 }}
                />
            )}
            <PressableButton
                customizedStyle={styles.button}
                buttonPressed={locationSelectHandler}
            >
                <Text>Let me choose!</Text>
            </PressableButton>
            {location && (<PressableButton
                customizedStyle={styles.button}
                buttonPressed={locationSaveHandler}
            >
                <Text>Save Location!</Text>
            </PressableButton>)}

        </View>
    );
}

const styles = {
    button: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 5,
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // margin: 8,
        padding: 10,
    },
}