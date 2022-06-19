import React , {useState} from "react";
import { View, Text,  StyleSheet } from "react-native";
import DoctorAppointmentsList from "./components/DoctorAppointmentsList"

const DoctorAppointmentsScreen = ({ navigation }) => {


const dummyAppointments=[
    { id:1 , patient:"Khaled Mohamed" , day:"22-6-2022" , time:"22:10" , status:"Upcoming" },
    { id:2 , patient:"Yaser Aly" , day:"22-6-2022" , time:"5:00" , status:"Upcoming" },
    { id:3 ,  patient:"Mohamed Yousef" , day:"22-6-2022" , time:"7:30" , status:"Canceled" },
    { id:4 ,  patient:"Radwa Khalil" , day:"22-6-2022" , time:"13:45" , status:"Completed" },
    { id:5 ,  patient:"Souad Hosny" , day:"22-6-2022" , time:"9:50" , status:"Canceled" },
    { id:6 ,  patient:"Adel Ahmed" , day:"22-6-2022" , time:"22:10" , status:"Upcoming" },
    { id:7 ,  patient:"Fatma Hussein" , day:"22-6-2022" , time:"5:00" , status:"Upcoming" },
    { id:8 ,  patient:"Osama Yassin" , day:"22-6-2022" , time:"7:30" , status:"Canceled" },
    { id:9 ,  patient:"Ali Ibrahim" , day:"22-6-2022" , time:"13:45" , status:"Completed" },
    { id:10 ,  patient:"Hasan Hussein" , day:"22-6-2022" , time:"9:50" , status:"Canceled" },    
  ];

  const [appointments,setAppointments] = useState(dummyAppointments);

  return (
    <View style={{flex:1}}>
    <Text style={styles.title}>Scheduled Appointments</Text>
    <DoctorAppointmentsList  result={appointments} navigation={navigation} />
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

export default DoctorAppointmentsScreen;