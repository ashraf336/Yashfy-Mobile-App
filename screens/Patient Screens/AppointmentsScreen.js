import React , {useState} from "react";
import { View, Text,  StyleSheet } from "react-native";
import AppointmentsList from "./components/AppointmentsList";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 
//const baseUrl = "http://192.168.1.12:8080"; //DeVolopment

const AppointmentsScreen = ({ navigation }) => {

  const [appointments,setAppointments] = useState([]);
  const [token, setToken] = React.useState(null);


  {/******************************      API Call  Handlers  ***********************************/}
const fetchPatientAppointmentsHandle = async (token ) => {

  //CALLING API RETURN data 
  try {
    console.log(" ....... Calling API (Fetch patient appointments)......")
    const response = await axios.get(`${baseUrl}/patient/appointments` ,
    {
      headers: {
        'Authorization': `bearer ${token}` 
      }
    });

    if (response.status === 200) {
      console.log("inside" );

      let fetchedappointments = response.data.appointments
      console.log("appointments: ",fetchedappointments );
      return fetchedappointments
    } 
    else
    {
      Alert.alert('Not Found !', 'No apoointments Available', [
        {text: 'Try Again'}
     ]);
      return null;
    }
  }
   catch (error) {
    //setLoading(false);
    //setRefreshing(false)
    alert("An error has occurred in fetching appointments  ..");
    console.log(error);
    throw error;
  }
}


useFocusEffect(
  React.useCallback(() => {
    // reset Fields before fetching it 
    setAppointments([])
    // Fetch Token
     AsyncStorage.multiGet(['userToken','isDoctor']).then(res =>
      {
            setToken(res[0][1])
            const promise = fetchPatientAppointmentsHandle(res[0][1]);
            promise.then(appointments => {
              setAppointments(appointments)
            });
      }
    ).catch(err=>{
      console.log(err)
    })
 
  }, [])
);


  return (
    <View style={{flex:1}}>
    <AppointmentsList  result={appointments} token = {token} navigation={navigation} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:"center",
  },
});

export default AppointmentsScreen;