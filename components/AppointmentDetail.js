import react from "react";
import {View , Image , Text , StyleSheet} from 'react-native';

const AppointmentDetail = ({result}) => {
    return <View style={styles.container}>
        <Text style={styles.name}>{result.Date}</Text>
        <Text>{result.Day}</Text>
        <Text>{result.Start} - {result.End} </Text>

    </View>
};

const styles = StyleSheet.create({
  container:{
    
    marginLeft:15,
    marginBottom:10,
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
});

export default AppointmentDetail;