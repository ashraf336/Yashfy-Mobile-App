import React, { useState } from "react";
import { useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  // Text,
  Button,Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,SafeAreaView ,RefreshControl
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
  TextInput,
} from "react-native-paper";
import { ActivityIndicator } from 'react-native';
import AvaialbleAppointmentsList from "../components/AvaialbleAppointmentsList";
import ReviewsList from "../components/ReviewsList";

import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Collapsible from "react-native-collapsible";
import Tags from "react-native-tags";

import axios from "axios";
//const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 

const baseUrl = "http://192.168.1.12:8080"; //DeVolopment

const SingleDoctorScreen = ( { navigation, route } /*, token , *** result ****  */  ) => {

let  doctorId = route.params.id
console.log("Doctor ID : ", doctorId )
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbGVrMTIzNDU2QHlhaG9vLmNvbSIsInVzZXJJZCI6MSwiaWF0IjoxNjUzNDA5MjY0fQ.5w5thILYXhsfyAwjbhYZ-elstCNCxgHcysSGB9m20UE'

//**************** Doctor Data **********************//
const initialState = {doctor_name: "" ,
no_of_ratings: "0",
rating: 0,
doctor_speciality: "Consultant of " ,
consultation_fees: '0',
waiting_time: '0',
hospital_name:"",
region: ' ',
street: " ",
staff_rating: '0',
clinic_rating: '0',
doctor_treatment_rating: '0',
waiting_time_rating: '0',
equipement_rating: '0',
price_rating:'0',
about:
  "- Consultant of Plasric Surgery and Laser Treatment \n- Head of plastic surgeons Alexandria University Hospital",
experienceHeader: "2000 - Present",
experienceDetail:
  "Consultant plastic surgeon at Head of plastic surgery department",
supportedInsurances:[
  "Delta","Bupa", "Misr Insurance" , "Axa"
],}
const [result, setResult] = React.useState(
  initialState
);

/*************************  States ****************************/
const [isLoading, setLoading] = useState(true);
const [addReviewLoading, setaddReviewLoading] = useState(false);
const [refreshing, setRefreshing] = React.useState(false);



//**************** Doctor Slots**********************//
const [AvailableSlots, setAvailableSlots] = React.useState([]);

//****************Patient Reviews**********************// 
const [reviews, setReviews] = React.useState([]);


{/******************************      API Call  Handlers  ***********************************/}
const fetchDoctorDataHandle = async ( ) => {
  console.log("doc id inside ....",doctorId)

    //CALLING API RETURN data 
    try {
      console.log(" ....... Calling API (Fetch Doctor data)......")
      const response = await axios.get(`${baseUrl}/home/doctors/${doctorId}`);


      // { url , body , headear , config } for maore deatils visit docs
      if (response.status === 200) {
       // console.log(` Response: ${JSON.stringify(response.data)}`);
        console.log(` doctor data is fetched`);
        let result_api = response.data
        // Set the data with fetched data
        setResult({
          ...result,
          doctor_name:result_api.doctor.first_name+ " " + result_api.doctor.last_name ,
          rating: result_api.doctor.general_rank,
          doctor_speciality: "Consultant of " + result_api.doctor.specialization,
          consultation_fees: result_api.doctor.consultaion_fee,
          waiting_time: result_api.doctor.waiting_time,
          hospital_name: result_api.hospital_name ,
          region: result_api.doctor.region,
          staff_rating: result_api.doctor.catgs_staff,
          clinic_rating: result_api.doctor.catgs_Clinic,
          doctor_treatment_rating: result_api.doctor.catgs_doctor_treatment,
          waiting_time_rating: result_api.doctor.catgs_waiting_time,
          equipement_rating:result_api.doctor.catgs_equipment,
          price_rating:result_api.doctor.catgs_price,
        });
        return
      } 
      else
      {
        Alert.alert('Not Found !', 'Seems that this doctor is not found !', [
          {text: 'Try Again'}
       ]);
        return null;
      }
    }
     catch (error) {
      setLoading(false);
      setRefreshing(false)
      alert("An error has occurred in fetching doctor data ..");
      console.log(error);
      throw error;
    }
}
const fetchDoctorSlotsHandle = async ( ) => {

  //CALLING API RETURN data 
  try {
    console.log(" ....... Calling API (Fetch Doctor Slots) ......")
    const response = await axios.get(`${baseUrl}/home/doctors/${doctorId}/available-slots`);
    if (response.status === 200) {
      //console.log(` Response: ${JSON.stringify(response.data)}`);
      console.log(` doctor Slots is fetched`);

      let fetchedSlots = response.data.slots
      //console.log(` Fetched Slots Is : ${fetchedSlots}`);

      // Set the data with fetched data
      setAvailableSlots(fetchedSlots);

      return
    } 
    else
    {
      Alert.alert('Not Found !', 'Seems that Slots are not found !', [
        {text: 'Try Again'}
     ]);
      return null;
    }
  }
   catch (error) {
    setLoading(false);
    setRefreshing(false)
    alert("An error has occurred in fetching Doctor Available Slots ..");
    console.log(error);
    throw error;
  }
}
const fetchDoctorReviewsHandle = async ( ) => {

  //CALLING API RETURN data 
  try {
    console.log(" ....... Calling API (Fetch Doctor Reviews) ......")
    const response = await axios.get(`${baseUrl}/home/doctors/${doctorId}/reviews`);
    setLoading(false);
    setRefreshing(false)
    if (response.status === 200) {
     // console.log(` Response: ${JSON.stringify(response.data)}`);
     console.log(` doctor reviews is fetched`);

      let fetchedReviews = response.data.reviews
      //console.log(` Fetched Slots Is : ${fetchedSlots}`);

      // Set the data with fetched data
      console.log("INSIDE")
      setReviews(fetchedReviews);
      result.no_of_ratings = fetchedReviews.length

      return
    } 
    else
    {
      Alert.alert('Not Found !', 'Seems that Slots are not found !', [
        {text: 'Try Again'}
     ]);
      return null;
    }
  }
   catch (error) {
    setLoading(false);
    setRefreshing(false)
    alert("An error has occurred in fetching doctor Reviews");
    console.log(error);
    throw error;
  }
}
const addReviewHandle = async (review ) => {

  //CALLING API RETURN data 
try {
    console.log(" ....... Calling API (Add Review) ......")
     setaddReviewLoading(true)
     const response = await axios.post(`${baseUrl}/patient/make-review`, review /*posted data */ , {
      headers: {
        'Authorization': `bearer ${token}` 
      }
    })

    if (response.status === 201) {
      setLoading(false);
      setRefreshing(false)
      setaddReviewLoading(false)
      console.log(` Response: ${JSON.stringify(response.data)}`);
      console.log("..... Done Adding Review .....")      
      return
    } 
    else
    {
      Alert.alert('Not Found !', 'ERROR !', [
        {text: 'Try Again'}
     ]);
      return null;
    }
  }
   catch (error) {
    setaddReviewLoading(false)
    setLoading(false);
    setRefreshing(false)
    alert("An error has occurred");
    console.log(error);
    throw error;
  }
}


useFocusEffect(
  React.useCallback(() => {
    setResult(initialState)
    setAvailableSlots([])
    setReviews([])
    fetchDoctorDataHandle()
    fetchDoctorSlotsHandle()
    fetchDoctorReviewsHandle()
  }, [doctorId])
);

// FETCH DOCTOR DATA when swap down to refresh
const onRefresh = React.useCallback(() => {
  console.log("Doctor ID in refresh !: ", doctorId )
  setRefreshing(true);
  fetchDoctorDataHandle();
  fetchDoctorSlotsHandle()
  fetchDoctorReviewsHandle()
  console.log("..... Done FETCHING .....")      
}, [doctorId]);


/**** Sections Togglers  ****/
const [about, setAbout] = useState(true);
const [experience, setExperience] = useState(true);
const [supportedInsurances, setsupportedInsurances] = useState(true);

/*************** User ADD REVIEW  ****************/
const [addedReview, setAddedReview] = useState({
  review: "" ,
  is_review_annoymous: 0,
  doctorId: doctorId /* passed in screen*/
});
const [addReviewVisible, setAddReviewVisible] = useState(false);
const handleAddReview = (val) => {
  setAddedReview({
      ...addedReview,
      review: val,
    });
  };


/********************************   SCREEN  **********************************************************/   

  return (

    <SafeAreaView style={styles.container}> 
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      
    >
          
      {/******************* ------------HEADER Section------------ *******************/}
      <View style={styles.headerView}>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Avatar.Image
            style={{ marginLeft: 15, marginTop: 5 }}
            source={require("../assets/osama.jpg")}
            size={100}
          />

          <View style={styles.doctorDescription}>
            <Title style={styles.title}>Doctor {result.doctor_name}</Title>
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
              style={[styles.caption, { marginTop: 5, color: "black" }]}
            >
              {result.doctor_speciality}
            </Caption>
          </View>
        </View>
      </View>
      {/**************************--------------------------****************************/}
        
      {/******************* ------------BODY Section------------ *******************/}
      <View style={styles.bodyView}>
        {/************** CONSULTATION FEES and WAITING TIME *************/}
        <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <View style={styles.smallSections}>
            <Ionicons
              name="wallet-outline"
              color="#009387"
              size={30}
              style={styles.icon}
            />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.smallSectionsTitle}>
                {result.consultation_fees} EGP
              </Text>
              <Text>Consultation Fees</Text>
            </View>
          </View>
          <View style={styles.smallSections}>
            <Ionicons
              name="timer-outline"
              color="#009387"
              size={30}
              style={styles.icon}
            />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.smallSectionsTitle}>
                {result.waiting_time}
              </Text>
              <Text>Waiting Time</Text>
            </View>
          </View>
        </View>
        {/********************************************************/}
        {/*<View style={styles.loading}>
          {isLoading && <ActivityIndicator size="large" color="#009387"  /> }
        </View>*/}
        <View style={styles.lineStyle} />
        {/****************   APPOINTMENTS ************************/}
        <ScrollView>
          <AvaialbleAppointmentsList result={AvailableSlots} token={token} doctorId={doctorId} />
        </ScrollView>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        {/****************   HOSPITAL ************************/}
        <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <FontAwesome5
            name="hospital-symbol"
            color="#009387"
            size={30}
            style={styles.icon}
          />
          <View style={{ alignSelf:'center' }}>
            <Text style={styles.hospitalName}>
               {result.hospital_name}
            </Text>
          </View>
        </View>
        {/********************************************************/}     
        <View style={styles.lineStyle} />   
        {/****************   LOCATION ************************/}
        <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <Ionicons
            name="location-outline"
            color="#009387"
            size={30}
            style={styles.icon}
          />
          <View style={{ marginTop: 5 }}>
            <Text style={styles.smallSectionsTitle}>
              {result.region}
            </Text>
            <Text>Book and you will recieve the address details</Text>
          </View>
        </View>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        
        {/****************   FOLLOW-UP FEES ************************/}
        <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <Ionicons
            name="information-circle-outline"
            color="#009387"
            size={30}
            style={styles.icon}
          />
          <View style={{ alignSelf: "center" }}>
            <Text>Follow-up is for 100 EGP within 14 days</Text>
          </View>
        </View>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        {/****************   CLINIC & DOCTOR TREATMENT RATINGS ************************/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            marginBottom: 15,
          }}
        >
          <View style={styles.smallSections}>
            <Ionicons
              name="star"
              color="#009387"
              size={25}
              style={[styles.icon, { color: "gold", alignSelf: "center" }]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {result.doctor_treatment_rating} /5
              </Text>
              <Text>Doctor Treatment</Text>
            </View>
          </View>
          <View style={styles.smallSections}>
            <Ionicons
              name="star"
              color="#009387"
              size={25}
              style={[styles.icon, { color: "gold", alignSelf: "center" }]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {result.clinic_rating} /5
              </Text>
              <Text>Clinic</Text>
            </View>
          </View>
        </View>
        {/********************************************************/}
        {/* <View style={styles.lineStyle} /> */}
        {/****************   STAFF & WAITING TIME RATINGS ************************/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            marginBottom: 15,
          }}
        >
          <View style={styles.smallSections}>
            <Ionicons
              name="star"
              color="#009387"
              size={25}
              style={[styles.icon, { color: "gold", alignSelf: "center" }]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {result.staff_rating} /5
              </Text>
              <Text>Staff</Text>
            </View>
          </View>
          <View style={styles.smallSections}>
            <Ionicons
              name="star"
              color="#009387"
              size={25}
              style={[styles.icon, { color: "gold", alignSelf: "center" }]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {result.waiting_time_rating} /5
              </Text>
              <Text>Waiting Time </Text>
            </View>
          </View>
        </View>
        {/********************************************************/}
        {/* <View style={styles.lineStyle} /> */}
                {/****************   EQUIPMENT & PRICE RATINGS ************************/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            marginBottom: 15,
          }}
        >
          <View style={styles.smallSections}>
            <Ionicons
              name="star"
              color="#009387"
              size={25}
              style={[styles.icon, { color: "gold", alignSelf: "center" }]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {result.equipement_rating} /5
              </Text>
              <Text>Equipment </Text>
            </View>
          </View>
          <View style={styles.smallSections}>
            <Ionicons
              name="star"
              color="#009387"
              size={25}
              style={[styles.icon, { color: "gold", alignSelf: "center" }]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {result.price_rating} /5
              </Text>
              <Text>Price </Text>
            </View>
          </View>
        </View>
        {/********************************************************/}
        {/* <View style={styles.lineStyle} /> */}

      </View>
      {/******************----------------------*********************/}

      {/******************* ------------ABOUT Section------------ *******************/}
      <View style={styles.aboutView}>
        {/****************   ABOUT DOCTOR ************************/}
        <TouchableOpacity
          onPress={() => setAbout(!about)}
          style={{ marginTop: 15, alignItems: "stretch" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sectionHeader}>About Doctor</Text>
            <View style={{ flexDirection: "column", alignSelf: "flex-end" }}>
              <View style={{ marginLeft: 15 }}>
                {about ? (
                  <Ionicons
                    name="chevron-down-sharp"
                    color="#009387"
                    size={20}
                    style={{ flexDirection: "row-reverse" }}
                  />
                ) : (
                  <Ionicons
                    name="chevron-up-sharp"
                    color="#009387"
                    size={20}
                    style={{ flexDirection: "row-reverse" }}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={about} align="center">
          <View>
            <Text style={styles.sectionContent}>{result.about}</Text>
          </View>
        </Collapsible>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        {/****************   EXPERIENCE ************************/}
        <TouchableOpacity onPress={() => setExperience(!experience)}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sectionHeader}>Experience</Text>
            <View style={{ marginLeft: 15 }}>
              {experience ? (
                <Ionicons
                  name="chevron-down-sharp"
                  color="#009387"
                  size={20}
                  style={{ alignSelf: "flex-end" }}
                />
              ) : (
                <Ionicons
                  name="chevron-up-sharp"
                  color="#009387"
                  size={20}
                  style={{ alignSelf: "flex-end" }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={experience}>
          <View>
            <Text style={{ marginHorizontal: 20 }}>
              <Text style={{ fontWeight: "bold" }}>
                • {result.experienceHeader} :{" "}
              </Text>
              <Text style={styles.sectionContent}>
                {result.experienceDetail}
              </Text>
            </Text>
          </View>
        </Collapsible>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        {/****************   Supported Insurances ************************/}
        <TouchableOpacity
          onPress={() => setsupportedInsurances(!supportedInsurances)}
          style={{ alignItems: "stretch", marginBottom: 15 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sectionHeader}>Supported Insurances</Text>
            <View style={{ marginLeft: 15 }}>
              {supportedInsurances ? (
                <Ionicons
                  name="chevron-down-sharp"
                  color="#009387"
                  size={20}
                  style={{ alignSelf: "flex-end" }}
                />
              ) : (
                <Ionicons
                  name="chevron-up-sharp"
                  color="#009387"
                  size={20}
                  style={{ alignSelf: "flex-end" }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={supportedInsurances} align="center">
          <View>
            <Tags
              initialTags={result.supportedInsurances}
              deleteTagOnPress={false}
              readonly={true}
              tagContainerStyle={styles.tagContainer}
            />
          </View>
        </Collapsible>
      </View>
      {/********************************************************/}
      {/******************----------------------*********************/}

      {/******************* ------------PATIENT REVIEWS Section------------ *******************/}
      <View style={styles.bodyView}>
        <View>
          {/**********  Patient Reviews List   *******/}
          <ScrollView>
            <ReviewsList result={reviews}/>
          </ScrollView>          
          {/**************************/}

          <View style={styles.loading}>
          {addReviewLoading && <ActivityIndicator size="large" color="#009387"  /> }
          </View>

{/********************* Add Review Button and Window ***********/}
          <View>
          <Modal
        animationType="fade"
        transparent={true}
        visible={addReviewVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAddReviewVisible(!addReviewVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => {setAddReviewVisible(!addReviewVisible)}} style={styles.exitButton}>
            <Ionicons
                  name="ios-close-circle-outline"
                  color="red"
                  size={30}
                  style={{ alignSelf: "flex-end" }}
                />
            </TouchableOpacity>
            <Text style={styles.modalText}>Please write your review</Text>
            <TextInput style={
            [styles.textInput]}
             multiline={true} 
             numberOfLines={5} 
             textAlignVertical="top" 
             onChangeText={(val) => handleAddReview(val)} />
            <TouchableOpacity onPress=
            {() =>
               {setAddReviewVisible(!addReviewVisible),
                console.log("HIWAN")
                addReviewHandle(addedReview)

              }} 
            style={[styles.button, styles.buttonClose]}>
              <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
      <TouchableOpacity onPress={() => {setAddReviewVisible(true),handleAddReview('')}} style={[styles.button, styles.buttonOpen]}>
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>
{/***************************************************************************************************/}
          <Text style={[styles.sectionContent, { textAlign: "center" }]}>
            Overall Rating from {result.no_of_ratings} Visitors
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" , marginBottom:20}}>
            <View style={styles.smallSectionsReviews}>
              <View style={{ margin: 15, flex: 1, alignItems: "center" }}>
                <StarRating
                  starStyle={styles.stars}
                  starSize={20}
                  disabled={true}
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  maxStars={5}
                  rating={result.doctor_rating}
                  fullStarColor={"gold"}
                />
                <Text style={{ marginTop: 10 }}>Doctor Rating</Text>
              </View>
            </View>
            <View style={styles.smallSectionsReviews}>
              <View style={{ margin: 15, flex: 1, alignItems: "center" }}>
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
                <Text style={{ marginTop: 10 }}>Overall Rating</Text>
              </View>
            </View>
          </View>
        </View>

      </View>
      {/******************------------------------------------------------*********************/}
      {/* <Button title="Click Here" onPress={() => alert("Button Clicked!")} /> */}
    </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 72,
    bottom: 0,
   /* alignItems: 'center',
    justifyContent: 'center'*/
  },
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  tagContainer: {
    borderColor: "#98fb98",
    borderWidth: 3,
    backgroundColor: "white",
  },
  stars: {
    alignSelf: "center",
  },
  headerView: {
    backgroundColor: "white",
    marginBottom: 15,
    height: 160,
  },
  bodyView: {
    backgroundColor: "white",
    marginBottom: 15,
    height: "auto",
  },
  aboutView: {
    backgroundColor: "white",
    marginBottom: 15,
    height: "auto",
  },
  smallSections: {
    flexDirection: "row",
    marginTop: 10,
    width: "50%",
  },
  smallSectionsReviews: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 2,
    width: "45%",
    // paddingHorizontal:5
  },
  smallSectionsTitle: {
    fontWeight: "bold",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  sectionContent: {
    fontWeight: "normal",
    fontSize: 15,
    marginHorizontal: 20,
  },
  icon: {
    marginHorizontal: 20,
    marginVertical: 10,
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
  lineStyle: {
    borderWidth: 0.9,
    borderColor: "#e6e6fa",
    marginHorizontal: 20,
    marginVertical: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    alignSelf:"center",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:150,
    height:40,
    marginBottom:20,
    
  },
  exitButton:{
    alignSelf:"flex-end",
    borderRadius: 20,
    // padding: 10,
    // elevation: 2,
    width:50,
    height:50,
    // marginBottom:20,
    // backgroundColor:'black'
  },
  buttonOpen: {
    backgroundColor: "#90ee90",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize:20
  },
  buttonText:{
    alignSelf:"center",
    fontSize:18,
    fontWeight:"bold"

  },
  textInput: {
    // flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    width:300,
    textAlignVertical:"top",
   
    backgroundColor: "#f0f8ff",
    marginBottom:20,
  },
  hospitalName:{
    fontWeight:"bold",
    fontSize:16,
    textAlignVertical:"center",
  },
});

export default SingleDoctorScreen;
