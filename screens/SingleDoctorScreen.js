import React from "react";
import {
  View,
  // Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";

const SingleDoctorScreen = () => {
  let result = {
    doctor_name: "Doctor Osama Sherif",
    no_of_ratings: "15",
    rating: "4.5",
    doctor_title: "Consultant of Plastic Surgery and Laser Treatments",
    consultation_fees: "200",
    waiting_time:'8',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerView}>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Avatar.Image
            style={{ marginLeft: 15, marginTop: 5 }}
            source={require("../assets/osama.jpg")}
            size={100}
          />

          <View style={styles.doctorDescription}>
            <Title style={styles.title}>{result.doctor_name}</Title>
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
              {result.doctor_title}
            </Caption>
          </View>
        </View>
      </View>
      <View style={styles.bodyView}>
        <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <View style={styles.smallSections}>
            <Ionicons name="wallet-outline" color="#009387" size={30} style={styles.icon} />
            <View style={{marginTop:5}}>
              <Text  style={styles.smallSectionsTitle}>{result.consultation_fees} EGP</Text>
              <Text>Consultation Fees</Text>
            </View>
          </View>
          <View style={styles.smallSections}>
            <Ionicons name="timer-outline" color="#009387" size={30} style={styles.icon}/>
            <View style={{marginTop:5}} >
              <Text style={styles.smallSectionsTitle}>{result.waiting_time} min</Text>
              <Text>Waiting Time</Text>
            </View>
          </View>
        </View>
      </View>
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  stars: {
    alignSelf: "flex-start",
  },
  headerView: {
    backgroundColor: "white",
    marginBottom: 15,
    height: 160,
  },
  smallSections: {
    flexDirection: "row",
    // marginLeft: 10,
    marginTop:10,
    width:'50%'
  },
  smallSectionsTitle:{
    fontWeight:'bold'
  },
  icon:{
    marginHorizontal:20,
    marginVertical:10,
  },
  bodyView: {
    backgroundColor: "white",
    marginBottom: 15,
    height: 500,
  },
  doctorDescription: {
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 150,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    marginBottom: 10,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    color: "#009387",
    flexShrink: 1,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default SingleDoctorScreen;
