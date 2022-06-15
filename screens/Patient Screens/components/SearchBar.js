import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({term, onTermChange,onTermSubmit}) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle}></Feather>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.textInputStyle}
        placeholder="Search using doctor name ..."
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "lightgray",
    borderRadius: 8,
    height: 32,
    marginHorizontal: 15,
    marginTop:10,
    marginBottom:10,
    flexDirection: "row",
  },
  textInputStyle: {
    flex: 1,
    fontSize: 15,
  },
  iconStyle: {
    fontSize: 22,
    alignSelf: "center",
    margin: 5,
  },
});

export default SearchBar;
