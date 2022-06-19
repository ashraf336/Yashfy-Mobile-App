import React, { useState } from "react";
import {
  View,
  // Text,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
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
import { LinearGradient } from "expo-linear-gradient";
import ReviewsList from "../../components/ReviewsList";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from "react-native-star-rating";
import DatePicker from "react-native-datepicker";
import CountryPicker from "react-native-country-picker-modal";
import DropDownPicker from "react-native-dropdown-picker";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";  


// const baseUrl = "http://192.168.1.12:8080"; //Devolopment

const ProfileScreen = ( /*token*/) => {
  


const submitEditHandle = async (submission) => {
      setfetchapi(true);

      //CALLING API RETURN TOKEN
      try {
        console.log(" Calling API ....")
        const response = await axios.post(`${baseUrl}/doctors/edit-profile`, submission);
        if (response.status === 200) {
          setfetchapi(false);
          Alert.alert('Done', 'Successfuly Logged In.', [
            {text: 'Okay'}
          ]);
          console.log(` Response: ${JSON.stringify(response.data)}`);
          //call sign in function from authcontext JS object imported
  
          signIn(response.data);
          navigation.navigate("HomeScreen");  // This should be removed , the sigIn( ) in the previous line is enough.      
        } 
        else
        {
          setfetchapi(false);
          Alert.alert('Not Found User!', 'Username or password is incorrect.', [
            {text: 'Okay'}
         ]);
          return;
        }
      }
       catch (error) {
        setfetchapi(false);
        alert("An error has occurred");
        console.log(error);
        console.log("Status code" , response.status);
        throw error;
      }
  }
  
  const [data, setData] = useState({
    username: " ",
    email: " ",
    // password: "",
    // confirm_password: "",
    first_name: "Osama",
    last_name: "Sherif",
    phone_number: " ",
    date_of_birth: "01-01-1999",
    country: "",
    countryCode: "",
    city: " ",
    street_address:'',
    insurance:"",
    insurance_id:null,
  });  


  let submission = {
    first_name: data.first_name,
    last_name: data.last_name,
    city: data.city,
    phone_number: data.phone_number,
    date_of_birth: data.date_of_birth.split("-").reverse().join("-"),
    street_address: data.street_address,
    country: data.country,
    insurance_id: data.insurance,
  };  



  const [fieldsEditable,setFieldsEditable] = useState(false);


  
  //  For INSURANCE Dropdown
 
  const [InsurancesOpen, setInsurancesOpen] = useState(false);
  const [InsurancesItems, setInsurancesItems] = useState([
    {  id: 1 , label: "Axa" , value: "Axa"  },
    {  id: 2 , label: "Misr Insurance" ,  value: "Misr Insurance"},
    {  id: 3 , label: "Alianz", value: "Alianz"},
    {  id: 4 , label: "Bupa", value: "Bupa"},
    {  id: 5 , label: "Lintile" , value: "Lintile"},
    {  id: 6 , label: "Werty", value: "Werty"},
  ]);

///////////////////////   INPUT HANDLERS      ////////////////////////////////

const handleFirstNameChange = (val) => {
  setData({
    ...data,
    first_name: val,
  });
};

const handleLastNameChange = (val) => {
  setData({
    ...data,
    last_name: val,
  });
};

const handlePhoneNumberChange = (val) => {
  setData({
    ...data,
    phone_number: val,
  });
};

const handleDateofBirthChange = (val) => {
  setData({
    ...data,
    date_of_birth: val,
  });
};

const handleCityChange = (val) => {
  setData({
    ...data,
    city: val,
  });
};

const handleStreetAddressChange = (val) => {
  setData({
    ...data,
    street_address: val,
  });
};

const handleCountryChange = (val) => {
  setData({
    ...data,
    country: val.name,
    countryCode: val.cca2,
  });
};

const handleInsuranceChange = (val) => {
  setData({
    ...data,
    insurance_id: val.id,
    insurance: val.value,
  });
};


//////////////////////////////////////////////////////////////////////////////


/********************************   SCREEN  **********************************************************/   

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/******************* ------------HEADER Section------------ *******************/}
      <View style={styles.headerView}>
        <View style={{ flexDirection: "column", marginTop: 25,alignItems:"center" }}>
          <Avatar.Image
            style={{ marginLeft: 15, marginTop: 5 }}
            source={require("../../assets/patient.jpg")}
            size={175}
          />

          <View style={styles.doctorDescription}>
            <Title style={styles.title}>{data.first_name} {data.last_name}</Title>

            {/* <Caption style={styles.caption}>
              Overall Rating 
            </Caption>
            <Caption
              style={[styles.caption, {fontWeight:"bold",fontSize:16, marginTop: 15, color: "black" }]}
            >
              {data.doctor_speciality}
            </Caption> */}
          </View>
        </View>
      </View>
      {/**************************--------------------------****************************/}
      <View style={styles.headerView}>
        <View style={styles.footer}>  
          {/******************     USERNAME     ************************************/}
          <Text style={styles.text_footer}>Username *</Text>
            <View style={styles.action}>
              {/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
              <TextInput
               editable={false}
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[styles.textInput_2]}
                autoCapitalize="none"
                value={data.username}
              />
            </View>  
          {/******************     EMAIL     ************************************/}
          <Text style={styles.text_footer}>Email *</Text>
            <View style={styles.action}>
              {/* <FontAwesome name="user-o" color="#05375a" size={20} /> */}
              <TextInput
               editable={false}
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[styles.textInput_2]}
                autoCapitalize="none"
                value={data.email}
              />
            </View>
        </View>
      </View>



      {/******************* ------------DESCRIPTION Section------------ *******************/}
      <View style={styles.headerView}>
        <View style={styles.footer}>  
          {/********************** EDIT FIELDS BUTTON ****************************/}
            { !fieldsEditable?(
            <Pressable style={styles.button}  disabled={fieldsEditable} onPress={()=>setFieldsEditable(!fieldsEditable) }>
            <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.editField}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                   Edit Info
                </Text>
              </LinearGradient>
            </Pressable>)
            : 
            //////////   **********   DO NOT DELETE THIS SECTION   ********    /////////
            (
              <Pressable style={styles.button} disabled={!fieldsEditable} >
              <LinearGradient
                  colors={["white", "gray"]}
                  style={styles.editField}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                     Edit Info
                  </Text>
                </LinearGradient>
              </Pressable>)
            }          



          {/******************     FIRST NAME     ************************************/}
          <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
               editable={fieldsEditable}
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[styles.textInput_2]}
                autoCapitalize="none"
                value={data.first_name}
                onChangeText={(val) => handleFirstNameChange(val)}
              />
            </View>
          {/******************     LAST NAME     ************************************/}
          <Text style={styles.text_footer}>Last Name</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
               editable={fieldsEditable}
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[styles.textInput_2]}
                autoCapitalize="none"
                value={data.last_name}
                onChangeText={(val) => handleLastNameChange(val)}
              />
            </View>            
          {/******************     DATE OF BIRTH     ************************************/}
          <Text style={styles.text_footer}>Date of Birth</Text>
            <View style={styles.action}>
              <DatePicker
                style={styles.datePickerStyle}
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                date={data.date_of_birth}
                format="DD-MM-YYYY"
                minDate="01-01-1910"
                maxDate="01-01-2022"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                disabled={!fieldsEditable}
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderWidth: 0,
                  },
                }}
                onDateChange={(val) => {
                  handleDateofBirthChange(val);
                }}
              />
            </View>  

          {/******************************      PHONE NUMBER     ***********************************/}
          <Text style={[styles.text_footer]}>
            Phone Number
          </Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="+20****"
              placeholderTextColor="#666666"
              value={data.phone_number}
              editable={fieldsEditable}
              keyboardType="numeric"
              style={[styles.textInput_2]}
              autoCapitalize="none"
              onChangeText={(val) => handlePhoneNumberChange(val)}
            />
          </View>

          {/******************************      COUNTRY     ***********************************/}
          <Text style={styles.text_footer}>Country</Text>
                    <View style={styles.action}>
                      <CountryPicker
                        countryCode={data.countryCode}
                        onSelect={(val) => {
                          handleCountryChange(val);
                        }}
                        withModal={true}
                        withCountryNameButton={true}
                        withAlphaFilter={true}
                      />
                    </View>

          {/******************************      CITY     ***********************************/}
          <Text style={[styles.text_footer]}>City</Text>
          <View style={styles.action}>
            <MaterialCommunityIcons name="city" color="#05375a" size={23} />
            <TextInput
              placeholder="Your City"
              placeholderTextColor="#666666"
              style={[styles.textInput_2]}
              autoCapitalize="none"
              value={data.city}
              editable={fieldsEditable}
              onChangeText={(val) => handleCityChange(val)}
            />
          </View>

          {/******************************      STREET ADDRESS     ***********************************/}
          <Text style={styles.text_footer}>Street Address</Text>
                    <View style={styles.action}>
                    <Entypo name="address" color="#05375a" size={23} />
                      <TextInput
                        // placeholder="Your Address"
                        // placeholderTextColor="#666666"
                        style={[styles.textInput_2]}
                        autoCapitalize="none"
                        onChangeText={(val) => handleStreetAddressChange(val)}
                      />
                    </View>


          {/******************************      INSURANCE     ***********************************/}
          <Text style={[styles.text_footer,{ marginTop:10}]}>Insurance</Text>
          <View style={{ marginTop: 10 }}>
            <DropDownPicker
              listMode="MODAL"
              open={InsurancesOpen}
              value={data.insurance}
              items={InsurancesItems}
              setOpen={setInsurancesOpen}
              onSelectItem={(val) => {handleInsuranceChange(val);}}
              disabled={!fieldsEditable}
            />
          </View>


        {/********************** SUBMIT BUTTON ****************************/}
           { fieldsEditable?(
            <Pressable style={styles.button} disabled={!fieldsEditable} 
            onPress={()=>
            {
              // API CALL FOR SUBMIT THE EDIT 
              // submitEditHandle(/*pass new data*/)
              setFieldsEditable(!fieldsEditable),
              alert("Changes Saved!") 
            }}
              >
            <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.submit}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Save
                </Text>
              </LinearGradient>
            </Pressable>): null}
        </View>
      </View>
      {/**************************--------------------------****************************/}

      {/******************------------------------------------------------*********************/}


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
    // height: 160,
    // alignItems:"center",
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
    alignItems:"center",
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
    fontSize: 28,
    marginTop: 3,
    marginBottom: 10,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 13,
    lineHeight: 20,
    color: "#009387",
    flexShrink: 1,
    textAlign:"center",
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
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#f2f2f2",
    paddingBottom: 25,
  },
  textInput_2: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    backgroundColor: "white",
    // fontSize:18,
    height:40,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editField: {
    // width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submit: {
    // width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button:{
    alignSelf:"center",
    width:150,
    marginVertical:15,
  },
  datePickerStyle: {
    width: "100%",
    // marginTop: 20,
    borderWidth: 0,
  },
  qualificationsStyle: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    paddingLeft: 40,
  },

});

export default ProfileScreen;
