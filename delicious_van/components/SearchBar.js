import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import colors from "../colors";

const SearchBar = () => {
  
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
    search:{
        position: 'absolute',
        left:20,
        right:20,
        top: 10,
        height:30,
        backgroundColor:colors.lightGray,
        borderRadius:5,
    }

})