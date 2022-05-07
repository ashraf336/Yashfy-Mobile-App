import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import DatePicker from "react-native-datepicker";
import CountryPicker from "react-native-country-picker-modal";
import DropDownPicker from 'react-native-dropdown-picker';
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";
//const baseUrl = "https://reqres.in";
const baseUrl = "http://192.168.1.12:8080"; //DeVolopment


const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    email:'',
    password: "",
    confirm_password: "",
    first_name:'',
    last_name:'',
    phone_number:'',
    date_of_birth: "01-01-1999",
    country: "",
    city:'',
    street_address:'',
    insurance:'',
    insurance_id:null,
    countryCode: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  //  For Insurance Dropdown 
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'AXA Insurance', value: 'AXA Insurance',id:1},
    {label: 'Metlife Alico', value: 'Metlife Alico',id:2},
    {label: 'Misr Insurance', value: 'Misr Insurance',id:3},
    {label: 'Allianz', value: 'Allianz',id:4},
    {label: 'Suez Canal Insurance', value: 'Suez Canal Insurance',id:5},
    {label: 'Delta insurance', value: 'Delta insurance',id:6},
    {label: 'Bupa', value: 'Bupa',id:7},
  ]);


{/*****  submission: this variable will be JSON object to be submitted    *****/}  
  let submission = {
    username: data.username,
    email: data.email,
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    date_of_birth: (data.date_of_birth).split("-").reverse().join("-"),
    age: 0,
    street_address: data.street_address,
    city: data.city,
    country: data.country,
    insurance_id: parseInt(data.insurance_id),
  };



 {/******************************   Dummy API post request   ************************************/}  
  const onSubmitFormHandler = async (event) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${baseUrl}/patients-auth/patient-signup`, submission);
      if (response.status === 201) {
        alert(`${JSON.stringify(response.data)}`);
        console.log(` You have created: ${JSON.stringify(response.data)}`);
        navigation.navigate("SignInScreen");
        setIsLoading(false);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      console.log(error);
      console.log("Status code" , response.status);

      setIsLoading(false);
    }
  };
{/********************************************************************************/}  




  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        // isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        // isValidUser: false
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };


  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };


  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        // isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        // isValidPassword: false
      });
    }
  };


  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };
  
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

  const handleCountryChange = (val) => {
    setData({
      ...data,
      country: val.name,
      countryCode: val.cca2,
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
 
  
  const handleInsuranceChange = (val) => {
    setData({
      ...data,
      insurance_id: val.id,
      insurance: val.value,
    });
  };



{/************************************************************************************/}
{/******************************    View      ****************************************/}
{/************************************************************************************/}

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Please fill the following fields</Text>
      </View>

      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
        <ScrollView>

{/******************************     USERNAME     ************************************/}
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

{/******************************     EMAIL     **************************************/}          
          <Text style={[styles.text_footer , {
                marginTop: 35,
              }]}>Email</Text>
          <View style={styles.action}>
          <Fontisto name="email" color="#05375a" size={23} />
             <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleEmailChange(val)}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>

{/******************************     PASSWORD     **************************************/}            
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

{/******************************     Confirm PASSWORD     ***********************************/}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              // color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

{/******************************     FIRST NAME     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>First Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your First Name"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleFirstNameChange(val)}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>

{/******************************     LAST NAME     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Last Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Last Name"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleLastNameChange(val)}
            />
          </View>

{/******************************      PHONE NUMBER     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Phone Number</Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="+20****"
              placeholderTextColor="#666666"
              keyboardType="numeric"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handlePhoneNumberChange(val)}
            />
          </View>

{/******************************      DATE OF BIRTH     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Date of Birth</Text>
          <View style={styles.action}>
            <DatePicker
              style={styles.datePickerStyle}
              date={data.date_of_birth} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-1910"
              maxDate="01-01-2022"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
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
              onDateChange={(val) => {handleDateofBirthChange(val);}}
            />
          </View>

{/******************************      COUNTRY     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Country</Text>
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
          <Text style={[styles.text_footer, { marginTop: 35 }]}>City</Text>
          <View style={styles.action}>
          <MaterialCommunityIcons name="home-city" color="#05375a" size={21} />
            <TextInput
              placeholder="Your City"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleCityChange(val)}
            />
          </View>

{/******************************      STREET ADDRESS     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Street Address</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Address"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleStreetAddressChange(val)}
            />
          </View>

{/******************************      INSURANCE     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Insurance</Text>
          <View style={styles.action}>
          <DropDownPicker
            listMode="MODAL"
            open={open}
            value={data.insurance}
            items={items}
            setOpen={setOpen}
            // setValue={setValue}
            // setItems={setItems}
            onSelectItem={(val) => {handleInsuranceChange(val);}}
          />
            {/* <Picker
              mode={"dialog"}
              selectedValue={data.insurance}
              style={{ height: 30, width: 150 }}
              onValueChange={(val) => {handleInsuranceChange(val);}}
            >
              <Picker.Item label="none" value={null} />
              <Picker.Item label="Axa" value="Axa" />
              <Picker.Item label="United" value="United" />
            </Picker> */}
          </View>


       
{/******************************      SIGN UP   --BUTTON--     ***********************************/}       
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              disabled={isLoading}
              onPress={()=>{
                onSubmitFormHandler() ; 
                console.log(submission);
               }
                // loginHandle(data.username, data.password);
              }
            >
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

{/******************************      SIGN IN   --BUTTON--     ***********************************/}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Sign In instead ?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignInScreen")}
                style={[
                  styles.signUp,
                  {
                    borderColor: "#009387",
                    borderWidth: 0,
                    marginTop: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#009387",
                    },
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text: {
    color: "black",
    marginTop: 15,
    fontSize: 15,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signUp: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: "100%",
    // marginTop: 20,
    borderWidth: 0,
  },
});

export default SignUpScreen;
