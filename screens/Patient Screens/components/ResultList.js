import React from "react";
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from "react-native";
import ResultDetail from "./ResultDetail";
// import { withNavigation } from "react-navigation";

const ResultList = ({result, navigation }) => {
/*console.log("Doctors List ", result)*/

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
          return (<TouchableOpacity onPress={()=>navigation.navigate("SingleDoctorScreen",{id:item.id})}>
          <ResultDetail result={item} />
          </TouchableOpacity>)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
      marginBottom:30,
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

export default ResultList ;
