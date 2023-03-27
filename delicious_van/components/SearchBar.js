import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

const SearchBar = () => {
  const [text, setText]= useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search for delicious food"
        value={text}
        onChangeText={setText}    
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    search:{
        position: 'absolute',
        left:20,
        right:20,
        top: 10,
        height:30,
        backgroundColor:'#eee',
        borderRadius:5,
    }

})