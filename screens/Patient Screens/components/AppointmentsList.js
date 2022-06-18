import React from "react";
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from "react-native";
import AppointmentDetail from "./AppointmentDetail";


const AppointmentsList = ({result, navigation }) => {

if(!result.length){
  return null;
}

  return (
    <View style={styles.Container}>    
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={result}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (<TouchableOpacity disabled="true">
          <AppointmentDetail result={item} />
          </TouchableOpacity>)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
      flex:1,
  },  
  Title: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 15,
    marginBottom:5
  },
  Result: {},
});

export default AppointmentsList ;
