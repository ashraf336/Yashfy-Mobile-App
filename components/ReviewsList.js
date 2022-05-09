import React from "react";
import { Text, StyleSheet, View, FlatList,TouchableOpacity,Alert } from "react-native";
import ReviewDetail from "./ReviewDetail";


const ReviewsList = ({  result }) => {

if(!result.length){
  return null;
}

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}> Patients Reviews </Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={result}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (<TouchableOpacity style={{marginHorizontal:10}}>
          <ReviewDetail result={item} />
          </TouchableOpacity>)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
      marginBottom:15
  },  
  Title: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 15,
    marginBottom:15,
    marginTop:15,
    textAlign:"center"
  },
  Result: {},
});

export default ReviewsList ;
