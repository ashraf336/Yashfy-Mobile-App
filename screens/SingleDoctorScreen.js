import React, { useState } from "react";
import {
  View,
  // Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
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
import AvaialbleAppointmentsList from "../components/AvaialbleAppointmentsList";
import ReviewsList from "../components/ReviewsList";

import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Collapsible from "react-native-collapsible";
import Tags from "react-native-tags";

const SingleDoctorScreen = () => {
  let result = {
    doctor_name: "Doctor Osama Sherif",
    no_of_ratings: "15",
    rating: 4.5,
    doctor_speciality: "Consultant of Plastic Surgery and Laser Treatments",
    consultation_fees: "200",
    waiting_time: "8",
    hospital_name:"Al Andalusia Hospital",
    region: "Roshdy",
    street: "Syria Street",
    staff_rating: 4.5,
    clinic_rating: 3.5,
    doctor_treatment_rating: 5,
    waiting_time_rating: 4.5,
    equipement_rating:2,
    price_rating:1,
    about:
      "- Consultant of Plasric Surgery and Laser Treatment \n- Head of plastic surgeons Alexandria University Hospital",
    experienceHeader: "2000 - Present",
    experienceDetail:
      "Consultant plastic surgeon at Head of plastic surgery department",
    subSpecialities: [
      "Facial Plastic Surgery",
      "Hand Surgery",
      "Pediatric Deformities and Birth Defects Surgery",
      "Rhinoplastic Surgery",
      "Eyes Cosmetic Surgery",
      "Pediatric Dermatology",
      "Cosmetic Dermatology and Laser",
      "Burn Surgery",
      "Adult Dermatology",
    ],
    supportedInsurances:[
      "Delta","Bupa", "Misr Insurance" , "Axa"
    ],
  };

//****************Appointments Slots**********************//
  let AvailableAppointments = {
    slots: [
      { Date: "20-4-2022", Day: "Sunday", Start: "9:00", End: "10:00", id: 1 },
      { Date: "20-4-2022", Day: "Sunday", Start: "12:00", End: "1:00", id: 2 },
      { Date: "20-4-2022", Day: "Sunday", Start: "3:00", End: "4:00", id: 3 },
      { Date: "21-4-2022", Day: "Monday", Start: "9:00", End: "10:00", id: 4 },
      { Date: "21-4-2022", Day: "Monday", Start: "10:00", End: "12:00", id: 5 },
      { Date: "21-4-2022", Day: "Monday", Start: "1:00", End: "2:00", id: 6 },
      { Date: "23-4-2022", Day: "Wednesday", Start: "9:00", End: "10:00", id: 7},
      { Date: "23-4-2022", Day: "Wednesday", Start: "1:00", End: "2:00", id: 8},
      { Date: "23-4-2022", Day: "Wednesday", Start: "3:00", End: "4:00", id: 9},
    ],
  };

//****************Patient Reviews**********************//  
let PatientsReviews={
  Reviews:[
    {"patient_name":"أحمد سعد" , "review":"الدكتور كان لطيف و العيادة كانت نضيفة", "rating":5 , id:1 },
    {"patient_name":"اسامة شريف" , "review":"خلصت الكشف بسرعة و الدكتور كان محترم", "rating":5 , id:2 },
    {"patient_name":"عبدو حبيب" , "review":"الدكتور ده كغأة", "rating":4 , id:3 },
    {"patient_name":"زياد نصرت" , "review":"تعامل الدكتور كان دون المستوى مش هروحله تاني", "rating":1 , id:4 },
    {"patient_name":"محمد ايمن" , "review":"سعيد جدا بتعاملي مع الدكتور ده و هرشحه لأصدقائي", "rating":5 , id:5 },
    {"patient_name":"اميرة بحجابي" , "review":"استنيت كتير اوي عشان ادخل للدكتور", "rating":2 , id:6 },
    {"patient_name":"ياسين" , "review":"ارجو مراعاة نظافة العيادة اكتر من كده", "rating":2 , id:7 },
  ]
};
  
    /**** Sections Togglers  ****/
  const [about, setAbout] = useState(true);
  const [experience, setExperience] = useState(true);
  // const [subSpecialities, setsubSpecialities] = useState(true);
  const [supportedInsurances, setsupportedInsurances] = useState(true);

  /*************** User ADD REVIEW  ****************/
  const [addReview, setAddReview] = useState({userReview:""});
  const handleAddReview = (val) => {
    setAddReview({
      userReview: val,
    });
  };

  /**************************************************/



  /********** ADD Review Window Toggle*************/
  const [addReviewVisible, setAddReviewVisible] = useState(false);



/********************************   SCREEN  **********************************************************/   

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
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
                {result.waiting_time} min
              </Text>
              <Text>Waiting Time</Text>
            </View>
          </View>
        </View>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        {/****************   APPOINTMENTS ************************/}
        <ScrollView>
          <AvaialbleAppointmentsList result={AvailableAppointments.slots} />
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
              {result.region}: {result.street}
            </Text>
            <Text>Book and you will recieve the address details</Text>
          </View>
        </View>
        {/********************************************************/}
        <View style={styles.lineStyle} />
        {/****************   EARNED POINTS ************************/}
        {/* <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <FontAwesome5
            name="coins"
            color="#009387"
            size={20}
            style={[styles.icon, { color: "gold", marginHorizontal: 25 }]}
          />
          <View style={{ alignSelf: "center" }}>
            <Text>
              <Text>You'll earn </Text>
              <Text
                style={{ color: "green", fontWeight: "bold", fontSize: 16 }}
              >
                200
              </Text>
              <Text> points after booking </Text>
            </Text>
          </View>
        </View> */}
        {/********************************************************/}

        
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

      {/******************* ------------Appointments Section------------ *******************/}
      {/* <ScrollView>
        <AvaialbleAppointmentsList  result={AvailableAppointments.slots}  />
      </ScrollView> */}
      {/************************************************************************************/}
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
            <ReviewsList result={PatientsReviews.Reviews}/>
          </ScrollView>          
          {/**************************/}

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
            <Text style={styles.modalText}>Please write your review : </Text>
            <TextInput style={[styles.textInput]} multiline={true} numberOfLines={5} textAlignVertical="top" onChangeText={(val) => handleAddReview(val)} />
            <TouchableOpacity onPress={() => {setAddReviewVisible(!addReviewVisible),console.log(addReview)}} style={[styles.button, styles.buttonClose]}>
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
  );
};

const styles = StyleSheet.create({
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
    elevation: 2,
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
    fontSize:20,
    textAlignVertical:"center",
  },
});

export default SingleDoctorScreen;
