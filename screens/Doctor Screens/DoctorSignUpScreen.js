import React, { useState } from "react";
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
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import DatePicker from "react-native-datepicker";
import CountryPicker from "react-native-country-picker-modal";
import DropDownPicker from "react-native-dropdown-picker";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator } from 'react-native';
import axios from "axios";
const baseUrl = "https://test-api-yashfy.herokuapp.com"; //Deployment
//const baseUrl = "http://192.168.1.12:8080"; //DeVolopment

const DoctorSignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "1999-01-01",
    specialization:"",
    consultaion_fee:0,
    region: '',
    // country: "",
    city: "",
    // street_address:'',
    // insurance:null,
    hospital:"",
    hospital_id: null,
    qualification_name: "",
    institute_name: "",
    procurement_year: "",
    countryCode: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    enableSignup:false,
    matchPasswored:true,
    check_email: true
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const [fetchapi, setfetchapi] = useState(false);


  //  For SPECIALIZATION Dropdown
  const [specializationOpen, setSpecializationOpen] = useState(false);
  const [specializationItems, setSpecializationItems] = useState([
    { label: "Allergy and immunology", value: "Allergy and immunology" },
    { label: "Anesthesiology", value: "Anesthesiology" },
    { label: "Dermatology", value: "Dermatology" },
    { label: "Diagnostic radiology", value: "Diagnostic radiology" },
    { label: "Emergency medicine", value: "Emergency medicine" },
    { label: "Family medicine", value: "Family medicine" },
    { label: "Internal medicine", value: "Internal medicine" },
    { label: "Medical genetics", value: "Medical genetics" },
    { label: "Neurology", value: "Neurology" },
    { label: "Nuclear medicine", value: "Nuclear medicine" },
    { label: "Obstetrics and gynecology", value: "Obstetrics and gynecology" },
    { label: "Ophthalmology", value: "Ophthalmology" },
    { label: "Pathology", value: "Pathology" },
    { label: "Pediatrics", value: "Pediatrics" },
    {
      label: "Physical medicine and rehabilitation",
      value: "Physical medicine and rehabilitation",
    },
    { label: "Preventive medicine", value: "Preventive medicine" },
    { label: "Psychiatry", value: "Psychiatry" },
    { label: "Radiation oncology", value: "Radiation oncology" },
    { label: "Surgery", value: "Surgery" },
    { label: "Urology", value: "Urology" },
  ]);


  //  For HOSPITAL Dropdown
  const [hospitalOpen, setHospitalOpen] = useState(false);
  const [hospitalItems, setHospitalItems] = useState([
    { label: "Agial Hospital", value: "Agial Hospital", id: 1 },
    {
      label: "Alexandria University Main Hospital",
      value: "Alexandria University Main Hospital",
      id: 2,
    },
    { label: "Alex Radiology Center", value: "Alex Radiology Center", id: 3 },
    {
      label: "Alexandria Pediatric Center",
      value: "Alexandria Pediatric Center",
      id: 4,
    },
    {
      label: "Alexandria Medical Center",
      value: "Alexandria Medical Center",
      id: 5,
    },
    { label: "Badrawy Hospital", value: "Badrawy Hospital", id: 6 },
    { label: "Coptic Hospital", value: "Coptic Hospital", id: 7 },
    { label: "Dar Al Shifa Hospital", value: "Dar Al Shifa Hospital", id: 8 },
    {
      label: "El Madina El Tebaya Hospital",
      value: "El Madina El Tebaya Hospital",
      id: 9,
    },
    { label: "El Shorouk Hospital", value: "El Shorouk Hospital", id: 10 },
    { label: "German Hospital", value: "German Hospital", id: 11 },
    {
      label: "Gamal Abd El Naser Hospital",
      value: "Gamal Abd El Naser Hospital",
      id: 12,
    },
    {
      label: "Mabaret Al-Asafra Hospitals",
      value: "Mabaret Al-Asafra Hospitals",
      id: 13,
    },
    { label: "Victoria Hospital", value: "Victoria Hospital", id: 14 },
    {
      label: "Alex Specialized Hospital",
      value: "Alex Specialized Hospital",
      id: 15,
    },
    { label: "Hassab Hospital", value: "Hassab Hospital", id: 16 },
  ]);

  {
    /*****  submission: this variable will be JSON object to be submitted    *****/
  }

  {
    /*****  submission: this variable will be JSON object to be submitted    *****/
  }

  let submission = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    username: data.username,
    password: data.password,
    city: data.city,
    specialization: data.specialization,
    consultaion_fee: data.consultaion_fee,
    phone_number: data.phone_number,
    date_of_birth: data.date_of_birth.split("-").reverse().join("-"),
    region: data.region,
    hospital_id: parseInt(data.hospital_id, 10),
    qualifications: [
      {
        qualification_name: data.qualification_name,
        institute_name: data.institute_name,
        procurement_year: data.procurement_year.split("-").reverse().join("-"),
      },
    ],
    // street_address: data.street_address,
    // country: data.country,
    // insurance_id: data.insurance,
  };

 {/******************************   Dummy API post request   ************************************/}  
 const onSubmitFormHandler = async (event) => {
  setfetchapi(true);
  setIsLoading(true);
  let config = {
    headers: {
        "Content-Type": "application/json"
  }
}
  try {
    console.log("Calling API ....")
    const response = await axios.put(`${baseUrl}/doctors-auth/doctor-signup`, submission, config);
     //response = await response.json()

    if (response.status === 201) {
      setfetchapi(false);
      Alert.alert('Done', 'Successfuly Signed Up.', [
        {text: 'Okay'}
    ]);
      navigation.navigate("DoctorSignInScreen");
      setIsLoading(false);
    } else {
      setfetchapi(false);
      console.log("Error happened : ",response.data)
      throw new Error("An error has occurred");
    }
  } catch (error) {
    alert("An error has occurred");
   // console.log("Error happened : ... ",response)
    setIsLoading(false);
    setfetchapi(false);
  }
}


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
    let emailCheck = ValidateEmail(val.trim())
    setData({
      ...data,
      email: val,
      check_email:emailCheck,
      enableSignup:emailCheck
    });
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
         isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
         isValidPassword: false
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    let matched = (val == data.password)
    setData({
      ...data,
      confirm_password: val,
      matchPasswored:matched
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
      insurance: val,
    });
  };

  const handleSpecializationChange = (val) => {
    setData({
      ...data,
      specialization: val.value,
    });
  };

  const handleConsultaionFeeChange = (val) => {
    setData({
      ...data,
      consultaion_fee: parseInt(val),
    });
  };

  const handleRegionChange = (val) => {
    setData({
      ...data,
      region: val,
    });
  };

  const handleHospitalChange = (val) => {
    setData({
      ...data,
      hospital_id: val.id,
      hospital:val.value,
    });
  };

  const handleQualificationsInstituteNameChange = (val) => {
    setData({
      ...data,
      //  institute_name : val,
      institute_name: val,
    });
  };

  const handleQualificationsQualificationNameChange = (val) => {
    setData({
      ...data,
      qualification_name: val,
    });
  };

  const handleQualificationsProcurementYearChange = (val) => {
    setData({
      ...data,
      procurement_year: val,
    });
  };

  {
    /************************************************************************************/
  }
  {
    /******************************    View      ****************************************/
  }
  {
    /************************************************************************************/
  }

  return (
    <View style={styles.container}>
    
      <StatusBar backgroundColor="#087ed4" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Please fill the following fields</Text>
      </View>

      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
  

        <ScrollView>
          {/******************************     USERNAME     ************************************/}
         
          <Text style = {{flexDirection: 'row',alignItems: 'center' ,flexWrap: 'wrap'}}>

          <Text style={styles.text_footer}>Username</Text> 
          <Text style = {{ color: 'red', fontSize: 18 }} > *</Text>
          
          </Text>
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
          <Text style={[styles.text_footer,{ marginTop: 35,},]}>
          <Text style={[styles.text_footer]}>Email</Text><Text style = {[styles.text_footer,{ color: 'red', fontSize: 18 }]} > *</Text>
          </Text>

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
             {data.check_email ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          { data.check_email ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}> must be valid email.</Text>
            </Animatable.View>
            }

          {/******************************     PASSWORD     **************************************/}
          <Text style={[styles.text_footer,{ marginTop: 35,},]}>  
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text><Text style = {[styles.text_footer,{ color: 'red', fontSize: 18 }]} > *</Text>
          </Text>

          <View style={styles.action}>
            <Feather name="lock" size={20} />
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
          { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }

          {/******************************     Confirm PASSWORD     ***********************************/}
          <Text style={[styles.text_footer,{ marginTop: 35,},]}>  
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
            </Text><Text style = {[styles.text_footer,{ color: 'red', fontSize: 18 }]} > *</Text>
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
          { data.matchPasswored ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password not matched !.</Text>
            </Animatable.View>
            }

          {/******************************     FIRST NAME     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            First Name
          </Text>
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
          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            Phone Number
          </Text>
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

          {/******************************      CONSULTAION FEE     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            Consultaion Fee
          </Text>
          <View style={styles.action}>
            <FontAwesome name="money" color="#05375a" size={20} />
            <TextInput
              placeholder="Enter fee amount"
              placeholderTextColor="#666666"
              keyboardType="numeric"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleConsultaionFeeChange(val)}
            />
          </View>

          {/******************************      DATE OF BIRTH     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            Date of Birth
          </Text>
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
              onDateChange={(val) => {
                handleDateofBirthChange(val);
              }}
            />
          </View>

          {/******************************      COUNTRY     ***********************************/}
          {/* <Text style={[styles.text_footer, { marginTop: 35 }]}>Country</Text>
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
          </View> */}

          {/******************************      CITY     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>City</Text>
          <View style={styles.action}>
            <MaterialCommunityIcons name="city" color="#05375a" size={23} />

            <TextInput
              placeholder="Your City"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleCityChange(val)}
            />
          </View>

          {/******************************      REGION     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Region</Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="home-city"
              color="#05375a"
              size={21}
            />
            <TextInput
              placeholder="Your City"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(val) => handleRegionChange(val)}
            />
          </View>

          {/******************************      SPECIALIZATION     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 20 }]}>
            Specialization
          </Text>
          <View style={{ marginTop: 10 }}>
            <DropDownPicker
              listMode="MODAL"
              open={specializationOpen}
              value={data.specialization}
              items={specializationItems}
              setOpen={setSpecializationOpen}
              // setValue={setValue}
              // setItems={setItems}
              onSelectItem={(val) => {
                handleSpecializationChange(val);
              }}
            />

          </View>

          {/******************************      HOSPITAL     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Hospital</Text>
          <View style={{ marginTop: 0 }}>
            <DropDownPicker
              listMode="MODAL"
              open={hospitalOpen}
              value={data.hospital}
              items={hospitalItems}
              setOpen={setHospitalOpen}
              // setValue={setValue}
              // setItems={setItems}
              onSelectItem={(val) => {
                handleHospitalChange(val);
              }}
            />
          </View>

          {/******************************     QUALIFICATIONS SECTION     ***********************************/}
          <View>
            <Text style={styles.qualificationsStyle}>Qualifications Info</Text>

            <Text style={[styles.text_footer, { marginTop: 20 }]}>
              Qualification Name
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Qualification Name"
                placeholderTextColor="#666666"
                style={[styles.textInput]}
                autoCapitalize="none"
                onChangeText={(val) =>
                  handleQualificationsQualificationNameChange(val)
                }
              />
            </View>

            <Text style={[styles.text_footer, { marginTop: 35 }]}>
              Institute Name{" "}
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Institute Name"
                placeholderTextColor="#666666"
                style={[styles.textInput]}
                autoCapitalize="none"
                onChangeText={(val) =>
                  handleQualificationsInstituteNameChange(val)
                }
              />
            </View>

            <Text style={[styles.text_footer, { marginTop: 35 }]}>
              Procurement Year
            </Text>
            <View style={styles.action}>
              <DatePicker
                style={styles.datePickerStyle}
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-1910"
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
                onDateChange={(val) => {
                  handleQualificationsProcurementYearChange(val);
                }}
              />
            </View>
          </View>


          <View style={styles.loading}>
          {fetchapi && <ActivityIndicator size="large" color="#087ed4"  /> }
          </View>
          <Text style={[{marginTop: 10, fontSize: 15,color: 'red' }]}>[*]  for required fields</Text>

{/******************************      SIGN UP   --BUTTON--     ***********************************/}  
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              disabled={!data.enableSignup}
              onPress={() => {
                onSubmitFormHandler();
                console.log(submission);
              }}
            >
              <LinearGradient
                colors={["#087ed4", "#01ab9d"]}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Sign In instead ?</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("DoctorSignInScreen")}
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
                      color: "#087ed4",
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
{/******************************     VIEWS STYLES    ***********************************/}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 1050,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: "#087ed4",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 4.5,
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
    fontSize: 25,
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
  qualificationsStyle: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    paddingLeft: 40,
  },
});

{/******************************     Helper Functions    ***********************************/}

const ValidateEmail= (input)=> {
  var validRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
export default DoctorSignUpScreen;
