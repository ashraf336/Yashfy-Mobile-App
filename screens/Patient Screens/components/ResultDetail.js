import react from "react";
import {View , Image , Text , StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  // Text,
  TouchableRipple,
  Switch,
  TextInput,
} from "react-native-paper";
import StarRating from "react-native-star-rating";

const ResultDetail = ({result}) => {
    return <View style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Avatar.Image
            style={{ marginLeft: 15, marginTop: 5 }}
            source={require("../../../assets/osama.jpg")}
            size={100}
          />

          <View style={styles.doctorDescription}>
            <Title style={styles.title}>{"Doctor "+result.doctor_name}</Title>
            <StarRating
              starStyle={styles.stars}
              starSize={20}
              disabled={true}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={result.rating}
              fullStarColor={"gold"}
            />
            <Caption style={styles.caption}>
              Overall Rating From {result.no_of_ratings} Visitors
            </Caption>
            <Caption
              style={[styles.caption, { marginTop: 15, color: "black" }]}
            >
              {result.doctor_speciality}
            </Caption>
          </View>
        </View>
    </View>
};

const styles = StyleSheet.create({
  container:{
    
    marginLeft:15
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
  doctorDescription: {
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 1,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    marginBottom: 10,
    fontWeight: "bold",
  },
  stars: {
    alignSelf: "center",
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    color: "#009387",
    flexShrink: 1,
  },
});

export default ResultDetail;