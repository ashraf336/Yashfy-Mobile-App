import React from "react";
import { Text, StyleSheet, View, FlatList,TouchableOpacity,Alert } from "react-native";
import AppointmentDetail from "./AppointmentDetail";
import axios from "axios";
//const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 

//const baseUrl = "http://192.168.1.12:8080"; //DeVolopment
const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 

const AvaialbleAppointmentsList = ({ navigation,result, doctorId, token }) => {


const bookAppointmentHandle = async (slot, doctorId, token ) => {

    //CALLING API RETURN data 
  try {
      console.log(" ....... Calling API (Book Appointmnet) ......")
       const response = await axios.post(`${baseUrl}/patient/bookAppointment`, 
       { 
        doctor_id: doctorId,
        slotId:slot.id

       },  /*posted data */  {
        headers: {
          'Authorization': `bearer ${token}` 
        }
      })
      if (response.status === 200) {
        console.log(` Response: ${JSON.stringify(response.data)}`);
        console.log("..... Done Booking Appointment  .....")  ;
        navigation.navigate("Appointments");
        alert("Your appointment has been booked succesfully.")
        
            } 
      else
      {
        Alert.alert('Not Found !', 'ERROR !', [
          {text: 'Try Again'}
       ]);
        return null;
      }
    }
     catch (error) {
      alert("An error has occurred");
      console.log(error);
      // navigation.navigate("Appointments");
      // alert("Your appointment has been booked succesfully.")
      throw error;
    }
  }

if(!result.length){
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
          return (<TouchableOpacity  disabled={!item.is_available} style={{marginHorizontal:10}} 
            onPress={
              ( )=>{
                Alert.alert(
                  "Reservation Confirmation" /* Head of alert */,
                  `Are you sure you want to confirm this Reservation \nAt ${ item.day_of_week}, ${item.time}?`, /* Text in box */
                  [ // clickable Buttons to show 
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "Confirm", onPress: ( ) =>
                    {
                      bookAppointmentHandle(item,doctorId, token)
                      
                    }  
                  }
                  ]
                )
              }}>
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
