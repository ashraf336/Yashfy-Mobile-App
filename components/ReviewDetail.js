import react from "react";
import {View , Image , Text , StyleSheet} from 'react-native';
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";

const ReviewDetail = ({result}) => {
    return <View style={styles.container}>
        <View style={{marginHorizontal:25,alignItems: "center",}}>
        { result.is_review_annoymous ? (<Text style={styles.name}>Annoymous</Text>) : (<Text style={styles.name}>{result.patient_name}</Text>) }
        <Text style={[styles.review,{flexShrink: 1}]}>{result.review}</Text>
        <Text style={styles.date_time}>{result.date} | {result.time}</Text>

        </View>
    </View>
};

const styles = StyleSheet.create({
  container:{

    // marginLeft:15,
    marginBottom:1,
    borderRightWidth: 2,
    borderColor: "#e6e6fa",
    flexShrink:1,
    width:200,

  },  
  name:{
      fontWeight:"bold",
      fontSize:19
  },
  review:{
    marginTop:6,
    fontSize:18,
    textAlign:"center",
    
  },
  date_time: {
    marginTop:5,
    fontSize:12.5,
  },
});

export default ReviewDetail;