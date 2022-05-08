import react from "react";
import {View , Image , Text , StyleSheet} from 'react-native';
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";

const ReviewDetail = ({result}) => {
    return <View style={styles.container}>
        <View style={{marginHorizontal:25,alignItems: "center",flexShrink: 1,}}>
        <Text style={styles.name}>{result.patient_name}</Text>
        <StarRating
                  starStyle={styles.stars}
                  starSize={15}
                  disabled={true}
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  maxStars={5}
                  rating={result.rating}
                  fullStarColor={"gold"}
                />
        <Text style={styles.review}>{result.review}</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
  container:{

    // marginLeft:15,
    marginBottom:10,
    borderRightWidth: 2,
    borderColor: "#e6e6fa",
  },  
  name:{
      fontWeight:"bold",
      fontSize:20
  },
  review:{
      marginTop:10,
    fontSize:18
  },
  stars: {
    alignSelf: "center",
  },
});

export default ReviewDetail;