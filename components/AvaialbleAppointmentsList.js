import React from "react";
import { Text, StyleSheet, View, FlatList,TouchableOpacity,Alert } from "react-native";
import AppointmentDetail from "./AppointmentDetail";


const AvaialbleAppointmentsList = ({  result }) => {

if(!result.length){
  console.log( "NO SLOTS !")
  return null;
}

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>Reserve an appointment </Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={result}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (<TouchableOpacity  disabled={!item.is_available} style={{marginHorizontal:10}} onPress={()=>Alert.alert(
            "Reservation Confirmation" /* Head of alert */,
            "Are you sure you want to confirm this Reservation?", /* Text in box */
            [ // clickable Buttons to show 
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Confirm", onPress: ( ) =>
              {
                console.log("Succesfully Reserved this slot",item)
              }  }
            ]
          )}>
          <AppointmentDetail result={item} />
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
    fontSize: 20,
    marginLeft: 15,
    marginBottom:15,
    marginTop:15,
    textAlign:"center"
  },
  Result: {},
});

export default AvaialbleAppointmentsList ;
