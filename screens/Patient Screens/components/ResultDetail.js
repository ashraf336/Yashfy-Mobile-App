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
        <View style={{ flexDirection: "row", marginTop: 3 }}>
          <Avatar.Image
            style={{ marginLeft: 7, marginTop: 15 }}
            
            source={require("../../../assets/osama.jpg")}
            size={110}
          />

          <View style={styles.doctorDescription}>
            <Title style={styles.title}>{"Doctor "+result.first_name+" "+(result.last_name?result.last_name:"")}</Title>
            <StarRating
              starStyle={styles.stars}
              starSize={13}
              disabled={true}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={result.general_rank}
              fullStarColor={"gold"}
            />
             <Caption
              style={[styles.caption, { marginTop: 3, color: "black" }]}
            >
              {"City: " + result.city}
            </Caption>

            <Caption
              style={[styles.caption, { marginTop: 3, color: "black" }]}
            >
              {"Region: " +result.region.split(' ')[0]}
            </Caption>

            <Caption
              style={[styles.caption, { marginTop: 3, color: "black" }]}
            >
              {"Specialized in " + result.specialization}
            </Caption>
          </View>
        </View>
    </View>
};

const styles = StyleSheet.create({
  container:{
    borderRightWidth: 2,
    borderColor: "#e6e6fa",
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
    marginLeft: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 8,
    fontWeight: "bold",
  },
  stars: {
    alignSelf: "center",
    marginTop: -7,
  },
  caption: {
    fontSize: 13,
    lineHeight: 16,
    color: "#009387",
    flexShrink: 1,
  },
});

export default ResultDetail;