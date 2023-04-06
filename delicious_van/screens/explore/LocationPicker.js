import { Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function LocationPicker({ navigation, route }) {
    const { currentLocation, sendLocation, postAddLocation } = route.params;
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleLocationConfirmation = () => {
        postAddLocation(selectedLocation)
        sendLocation(selectedLocation);
        navigation.goBack();
    };

    return (
        <>
            <MapView
                onPress={(event) => {
                    setSelectedLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                    });
                }}
                style={styles.container}
                initialRegion={{
                    latitude: currentLocation ? currentLocation.latitude : 37.78825,
                    longitude: currentLocation ? currentLocation.longitude : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {selectedLocation && <Marker title="Here!" coordinate={selectedLocation} />}
            </MapView>
            <Button
                title="Confirm selected location"
                disabled={!selectedLocation}
                onPress={handleLocationConfirmation}
            />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});