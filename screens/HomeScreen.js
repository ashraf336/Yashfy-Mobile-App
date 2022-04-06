import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import App from "../App";


const HomeScreen = ({ navigation }) => {
  let token = App.userToken;
  return (
    <View style={styles.container}>
      <Text>{token}</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
