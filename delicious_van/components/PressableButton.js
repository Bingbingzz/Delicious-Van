import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../colors'
export default function PressableButton(props) {
    return (
        <Pressable style={({ pressed }) => {
            return [styles.pressableDefault, props.customizedStyle, pressed && styles.pressedStyle]
        }} onPress={props.buttonPressed}>
            {props.children}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    pressableDefault: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        // opacity: 0.5,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    pressedStyle: {
        borderRadius: 8,
        backgroundColor: colors.pressedButtonStyle,
        // opacity: 0.5,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
})