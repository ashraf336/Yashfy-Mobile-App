import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  let userToken;
  AsyncStorage.getItem('userToken').then(res =>{console.log("The Token: ",res); userToken=res;}).catch(err=>{console.log(err)})

  return (
    <View style={styles.container}>
      <Text>{userToken}</Text>
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
