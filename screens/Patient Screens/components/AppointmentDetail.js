import react from "react";
import {View , Text , StyleSheet , TouchableOpacity  , Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const AppointmentDetail = ({result}) => {
    return <View style={styles.box}> 
    <View style={styles.container}>
        <View style={[styles.slot ,{flexDirection:"column"}]} >
            {/**** Doctor's Name & Specialization ****/}
            <Text style={styles.doctor}>Dr.{result.doctor}</Text>            
            <Text style={styles.specialization}>{result.specialization}</Text>
        </View>        
        <View style={styles.date_time}>
            {/* *******Appointment Date******** */}
            <Text style={styles.text}>Date:    </Text>
            <Text style={styles.data}>{result.day}</Text>
        </View>
        <View style={styles.date_time}>
            {/* ********** Time *********** */}
            <Text style={styles.text}>Time:   </Text>
            <Text style={styles.data}>{result.time}</Text>
        </View>
        <View style={styles.slot} >
            {/* ********** Status ************** */}
            <Text style={styles.status}>Status: {result.status}</Text> 

{/* **************** Cancel Appointment button (Show only for "Upcoming")******************* */}
{ result.status == "Upcoming" ?
            <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>  Alert.alert(
                "Appointment Cancelation",
                "Are you sure you want to cancel this appointment ?",
                [
                  {
                    text: "No",
                    style: "cancel"
                  },
                  { text: "Yes, I'm sure", onPress: () => console.log("Appointment Canceled") }
                ]
              )}
            >
            <LinearGradient
              colors={["#ffa07a", "#ff0000"]}
              style={styles.cancelButton}
            >
                <Text style={styles.cancelText}>Cancel Appointment</Text>
            </LinearGradient>
            </TouchableOpacity>
            :null    
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
  }, 
  box:{
    borderBottomColor:"#e6e6fa",
    borderBottomWidth:2,
  },
  slot:{
    flexDirection:"row",
    marginVertical:10,
  }, 
  date_time:{
    flexDirection:"row",
  },
  text:{
    fontSize:18,
    fontWeight:"bold",
  },
  data:{
    fontSize:18,
  },
  doctor:{
    fontSize:25,
    fontWeight:"bold",
  },
  specialization:{
    fontSize:15,
    fontWeight:"bold",
  },
  status:{
    fontSize:20,
    fontWeight:"bold",
    marginRight: 40,
  },
  cancelButton:{
    backgroundColor:"red",
    width: 160,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // marginLeft:15,
    
  },
  cancelText:{
    fontSize:15,
    fontWeight:"bold",
    color:"#e0ffff",
    
  },
});

export default AppointmentDetail;