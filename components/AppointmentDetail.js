import react from "react";
import {View , Image , Text , StyleSheet} from 'react-native';

const AppointmentDetail = ({result}) => {
    return <View style={styles.container}>
      <View style={{marginHorizontal:15,alignItems: "center",flexShrink: 1,}}>
        <Text style={styles.name}>{result.day_of_week}</Text>
        <Text style={styles.time} >{result.start_time}</Text>
        {result.is_available==true? (<Text>  </Text> ) :
              (<Text style={styles.booked}> Booked!</Text> ) }
        </View>
    </View>
};

const styles = StyleSheet.create({
  container:{
    // backgroundColor:"green",
    // marginHorizontal:15,
    marginBottom:10,
    borderRightWidth: 2,
    borderColor: "#e6e6fa",
  },  
  Image:{
    width:300,
    height:200,
    // marginLeft:30,
    // alignSelf: "center",
    borderRadius:15,
    marginBottom:5
  },
  name:{
      fontWeight:"bold",
      fontSize:16
  },
  time:{
    fontWeight:"normal",
    fontSize:13.5
},booked:{
  fontWeight:"bold",
  fontSize:13.5,
  color:"red"
},
});

export default AppointmentDetail;