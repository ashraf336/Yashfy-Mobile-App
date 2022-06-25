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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
//const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 
const baseUrl = "http://192.168.1.12:8080"; //DeVolopment

const ProfileScreen = ( /*token*/) => {
  
let intialState = {
    username: " ",
    email: " ",
    first_name: " ",
    last_name: " ",
    phone_number: " ",
    date_of_birth: " ",
    country: "",
    city: " ",
    street_address:' ',
    insurance:" ",
    insurance_id:null,
  }
const [data, setData] = useState(intialState);  
const [token, setToken] = React.useState(null);


  let submission = {
    first_name: data.first_name,
    last_name: data.last_name,
    city: data.city,
    phone_number: data.phone_number,
    date_of_birth: data.date_of_birth.split("-").reverse().join("-"),
    street_address: data.street_address,
    country: data.country,
    insurance_id: data.insurance_id,
  };  

{/******************************      API Call  Handlers  ***********************************/}
const fetchPatientDataHandle = async ( token) => {

    //CALLING API RETURN data 
    try {
      console.log(" ....... Calling API (Fetch Patient data)......")
      const response = await axios.get(`${baseUrl}/patient/profile`, {
        headers: {
          'Authorization': `bearer ${token}` 
        }
      });

      // { url , body , headear , config } for maore deatils visit docs
      if (response.status === 200) {
       // console.log(` Response: ${JSON.stringify(response.data)}`);
        console.log(` patient data is fetched`);
        // Set the data with fetched data
        return response.data.patient      } 
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

const submitEditHandle = async (submission , token) => {
      //setfetchapi(true);
      console.log("Submitted Data ...", submission)
      //CALLING API RETURN TOKEN
      try {
        console.log(" Calling API ....")
        const response = await axios.patch(`${baseUrl}/patient/edit-profile`, submission , {
          headers: {
            'Authorization': `bearer ${token}` 
          }
        });
        if (response.status === 200) {

         console.log(response.data);
         setData(intialState)  
         let promise = fetchPatientDataHandle(token)
         promise.then(patientData => {
          let insurance = InsurancesItems.find( ({ id }) => id === patientData.insuranceId );
          setData(
            {
              ...data,
              username: patientData.username,
              email: patientData.email,
              first_name: patientData.first_name,
              last_name : patientData.last_name,
              date_of_birth: patientData.date_of_birth.split("-").reverse().join("-"),
              city: patientData.city,
              country : patientData.country,
              phone_number: patientData.phone_number,
              street_address: patientData.street_address ,
              insurance_id:patientData.insuranceId,
              insurance: insurance.value
            }
          )
        });
         return

        } 
        else
        {
         //setfetchapi(false);
          Alert.alert('Not Found User!', 'Username or password is incorrect.', [
            {text: 'Okay'}
         ]);
          return;
        }
      }
       catch (error) {
        //setfetchapi(false);
        alert("An error has occurred");
        console.log(error);
        throw error;
      }
  }

  useFocusEffect(
    React.useCallback(() => {
      // reset Fields before fetching it 
      setFieldsEditable(false)
      setData(intialState)  
       // Fetch Token
       AsyncStorage.multiGet(['userToken','isDoctor']).then(res =>
        {
          setToken(res[0][1]);
           // Fetch All Data
          const promise = fetchPatientDataHandle(res[0][1]);
          promise.then(patientData => {
            let insurance = InsurancesItems.find( ({ id }) => id === patientData.insuranceId );
            setData(
              {
                ...data,
                username: patientData.username,
                email: patientData.email,
                first_name: patientData.first_name,
                last_name : patientData.last_name,
                date_of_birth: patientData.date_of_birth.split("-").reverse().join("-"),
                city: patientData.city,
                country : patientData.country,
                phone_number: patientData.phone_number,
                street_address: patientData.street_address ,
                insurance_id:patientData.insuranceId,
                insurance: insurance.value
              }
            )
          });

        }
      ).catch(err=>{
        console.log(err)
      })
      
   
    }, [])
  );
  

  const [fieldsEditable,setFieldsEditable] = useState(false);

  //  For INSURANCE Dropdown
 
  const [InsurancesOpen, setInsurancesOpen] = useState(false);
  const [InsurancesItems, setInsurancesItems] = useState([
    {  id: 0 , label: "none" , value: null  },
    {  id: 1 , label: "WellCare" , value: "WellCare"  },
    {  id: 2 , label: "Smart Care" ,  value: "Smart Care"},
    {  id: 3 , label: "Medright", value: "Medright"},
    {  id: 4 , label: "CarePlus", value: "CarePlus"},
    {  id: 5 , label: "Easy Care" , value: "Easy Care"},
    {  id: 6 , label: "Egymed", value: "Egymed"},
    {  id: 7 , label: "Family Care Cure", value: "Family Care Cure"},
    {  id: 8 , label: "Extra Care", value: "Extra Care"},
    {  id: 9 , label: "Elmothida", value: "Elmothida"},
    {  id: 10 , label: "City Care", value: "City Care"},
    {  id: 11 , label: "Banque Misr", value: "WeBanque Misrrty"},
    {  id: 12 , label: "Bank of Egypt Iran", value: "Bank of Egypt Iran"},
    {  id: 13 , label: "Badr Petroleum Company", value: "Badr Petroleum Company"},
    {  id: 14 , label: "Al Baraka Bank - Egypt", value: "Al Baraka Bank - Egypt"},
    {  id: 15 , label: "Access", value: "Access"},
    {  id: 16 , label: "Egycare", value: "Egycare"},
    {  id: 17 , label: "Axa", value: "Axa"},


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
            size={120}
          />

          <View style={styles.doctorDescription}>
            <Title style={styles.title}>{data.first_name} {data.last_name}</Title>

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
                        value={data.country}
                        onSelect={(val) => {
                          handleCountryChange(val);
                        }}
                        withModal={true}
                        withCountryNameButton={true}
                        withAlphaFilter={true}
                        disabled={!fieldsEditable}
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
              disabled={!fieldsEditable}
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
                        value={data.street_address}
                        onChangeText={(val) => handleStreetAddressChange(val)}
                        editable={fieldsEditable}
                      />
                    </View>


          {/******************************      INSURANCE     ***********************************/}
          <Text style={[styles.text_footer,{ marginTop:10}]}>Insurance</Text>
          <View style={{ marginTop: 10 , marginBottom: 10}}>
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
              submitEditHandle(submission,token)
              setFieldsEditable(!fieldsEditable),
              alert("Updates Saved Successfuly !") 
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
    marginBottom: 10,
    // height: 160,
    // alignItems:"center",
  },
  bodyView: {
    backgroundColor: "white",
    marginBottom: 10,
    height: "auto",
  },
  aboutView: {
    backgroundColor: "white",
    marginBottom: 10,
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
    fontSize: 12,
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
    fontSize: 25,
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
    paddingBottom: 15,
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
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submit: {
    // width: "50%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button:{
    alignSelf:"center",
    width:150,
    marginVertical:0,
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
