import react from "react";
import {View , Text , StyleSheet , TouchableOpacity  , Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 
//const baseUrl = "http://192.168.1.12:8080"; //DeVolopment


const DoctorAppointmentDetail = ({result , token , navigation}) => {

  console.log("token in detail", token)

  {/******************************      API Call  Handlers  ***********************************/}
  const cancelDoctorAppointmentsHandle = async (appointmentId, token ) => {
    console.log("token inside Func", token)

    //CALLING API RETURN data 
    try {
      console.log(" ....... Calling API (cancel doctor appointment)......")
      const response = await axios.patch(`${baseUrl}/doctors/cancel-appointment` ,{ AppointmentId: appointmentId},
      {
        headers: {
          'Authorization': `bearer ${token}` 
        }
      });
  
      if (response.status === 200) {
        console.log("inside" );
  
         response.data.appointments
        console.log( response.data.message );
        return 
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
      alert("An error has occurred in canceling appointment  ..");
      console.log(error);
      throw error;
    }
  }

 
    return <View style={styles.box}> 
    <View style={styles.container}>
        <View style={[styles.slot ,{flexDirection:"column"}]} >
            {/**** Doctor's Name & Specialization ****/}
            <Text style={styles.doctor}>{result.patient_name} </Text>            
        </View>    

        <View style={[styles.slot,{justifyContent:"space-between"}]} >
          <View style={[styles.date_time,{flexDirection:"column"}]}>
              {/* *******Appointment Date******** */}
              <Text style={[styles.data,{fontWeight:"bold",}]}>{result.day_of_week}</Text>
              {/* ********** Time *********** */}
              <Text style={[styles.data,{fontSize:14,}]}>{result.time}</Text>
          </View>
          
              {/* ********** Status ************** */}

           {result.states=="Upcoming"?(<Text style={[styles.status,{color: "green",}]}>{result.states}</Text>)
           :(<Text style={[styles.status,{color: "red",}]}>{result.states}</Text>)
           }   
           

  {/* **************** Cancel Appointment button (Show only for "Upcoming")******************* */}
  { result.states == "Upcoming" ?
              <TouchableOpacity
              style={[styles.cancelButton,{marginRight:30}]}
              onPress={()=>  Alert.alert(
                  "Appointment Cancelation",
                  "Are you sure you want to cancel this appointment ?",
                  [
                    {
                      text: "No",
                      style: "cancel"
                    },
                    { text: "Yes, I'm sure", 
                    onPress: ( ) => 
                    cancelDoctorAppointmentsHandle(result.id, token)

                    }
                  ]
                )}
              >
              <LinearGradient
                colors={["#ffa07a", "#ff0000"]}
                style={styles.cancelButton}
              >
                  <Text style={styles.cancelText}>Cancel</Text>
              </LinearGradient>
              </TouchableOpacity>
              :<View style={{marginRight:110}} ></View>    
  }                                
          </View>
        </View>     
    </View>
};

const styles = StyleSheet.create({
  container:{
    borderRightWidth: 2,
    borderColor: "#e6e6fa",
    marginLeft:15,
    marginVertical:15,
    backgroundColor: "white",

  }, 
  box:{
    borderBottomColor:"#e6e6fa",
    borderBottomWidth:5,
    backgroundColor: "white",

  },
  slot:{
    flexDirection:"row",
    marginVertical:1,

  }, 
  date_time:{
    flexDirection:"row",
  },
  text:{
    fontSize:18,
    fontWeight:"bold",
  },
  data:{
    fontSize:16,
  },
  doctor:{
    fontSize:19,
    fontWeight:"bold",
  },
  specialization:{
    fontSize:15,
    fontWeight:"bold",
  },
  status:{
    fontSize:16,
    fontWeight:"bold",
    marginRight: 25,
    marginLeft:45,
  },
  cancelButton:{
    backgroundColor:"red",
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,    
  },
  cancelText:{
    fontSize:15,
    fontWeight:"bold",
    color:"#e0ffff",
    
  },
});

export default DoctorAppointmentDetail;