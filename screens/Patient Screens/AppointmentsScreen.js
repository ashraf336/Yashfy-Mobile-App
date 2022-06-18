import React , {useState} from "react";
import { View, Text,  StyleSheet } from "react-native";
import AppointmentsList from "./components/AppointmentsList";

const AppointmentsScreen = ({ navigation }) => {


  const dummyAppointments=[
    { id:1 , doctor:"Mohamed Aiman" , specialization:"Nephrology" , day:"22-6-2022" , time:"22:10" , status:"Upcoming" },
    { id:2 , doctor:"Osama Sherif" , specialization:"Opthalmology" , day:"22-6-2022" , time:"5:00" , status:"Upcoming" },
    { id:3 , doctor:"Zeyad Nasrat" , specialization:"Phsycatry" , day:"22-6-2022" , time:"7:30" , status:"Canceled" },
    { id:4 , doctor:"Abdulrahman Habib" , specialization:"Urology" , day:"22-6-2022" , time:"13:45" , status:"Completed" },
    { id:5 , doctor:"Ahmed Ashraf" , specialization:"Dermatology" , day:"22-6-2022" , time:"9:50" , status:"Canceled" },
    { id:6 , doctor:"Mohamed Aiman" , specialization:"Nephrology" , day:"22-6-2022" , time:"22:10" , status:"Upcoming" },
    { id:7 , doctor:"Osama Sherif" , specialization:"Opthalmology" , day:"22-6-2022" , time:"5:00" , status:"Upcoming" },
    { id:8 , doctor:"Zeyad Nasrat" , specialization:"Phsycatry" , day:"22-6-2022" , time:"7:30" , status:"Canceled" },
    { id:9 , doctor:"Abdulrahman Habib" , specialization:"Urology" , day:"22-6-2022" , time:"13:45" , status:"Completed" },
    { id:10 , doctor:"Ahmed Ashraf" , specialization:"Dermatology" , day:"22-6-2022" , time:"9:50" , status:"Canceled" },    
  ];

  const [appointments,setAppointments] = useState(dummyAppointments);

  return (
    <View style={{flex:1}}>
    <Text style={styles.title}>My Appointments</Text>
    <AppointmentsList  result={appointments} navigation={navigation} />
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