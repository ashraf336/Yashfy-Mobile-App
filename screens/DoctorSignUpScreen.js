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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import DatePicker from "react-native-datepicker";
import CountryPicker from "react-native-country-picker-modal";
import DropDownPicker from "react-native-dropdown-picker";

// import {Picker} from '@react-native-picker/picker';

import axios from "axios";
const baseUrl = "https://reqres.in";

const DoctorSignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "01-01-1999",
    specialization: "",
    consultaion_fee: "",
    region: "",
    // country: "",
    city: "",
    // street_address:'',
    // insurance:null,
    hospital: "",
    qualification_name: "",
    institute_name: "",
    procurement_year: "",
    countryCode: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [isLoading, setIsLoading] = useState(false);

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
    { label: "Agial Hospital", value: "Agial Hospital" },
    {
      label: "Alexandria University Main Hospital",
      value: "Alexandria University Main Hospital",
    },
    { label: "Alex Radiology Center", value: "Alex Radiology Center" },
    {
      label: "Alexandria Pediatric Center",
      value: "Alexandria Pediatric Center",
    },
    { label: "Alexandria Medical Center", value: "Alexandria Medical Center" },
    { label: "Badrawy Hospital", value: "Badrawy Hospital" },
    { label: "Coptic Hospital", value: "Coptic Hospital" },
    { label: "Dar Al Shifa Hospital", value: "Dar Al Shifa Hospital" },
    {
      label: "El Madina El Tebaya Hospital",
      value: "El Madina El Tebaya Hospital",
    },
    { label: "El Shorouk Hospital", value: "El Shorouk Hospital" },
    { label: "German Hospital", value: "German Hospital" },
    {
      label: "Gamal Abd El Naser Hospital",
      value: "Gamal Abd El Naser Hospital",
    },
    {
      label: "Mabaret Al-Asafra Hospitals",
      value: "Mabaret Al-Asafra Hospitals",
    },
    { label: "Victoria Hospital", value: "Victoria Hospital" },
    { label: "Alex Specialized Hospital", value: "Alex Specialized Hospital" },
    { label: "Hassab Hospital", value: "Hassab Hospital" },
  ]);

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
    // phone_number: data.phone_number,
    date_of_birth: data.date_of_birth,
    region: data.region,
    hospital: data.hospital,
    qualifications: [
      {
        qualification_name: data.qualification_name,
        institute_name: data.institute_name,
        procurement_year: data.procurement_year,
      },
    ],
    // street_address: data.street_address,
    // country: data.country,
    // insurance_id: data.insurance,
  };

  {
    /******************************   Dummy API post request   ************************************/
  }
  const onSubmitFormHandler = async (event) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${baseUrl}/api/users`, submission);
      if (response.status === 200) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        console.log(` You have created: ${JSON.stringify(response.data)}`);
        navigation.navigate("DoctorSignInScreen");
        setIsLoading(false);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      console.log(error);
      setIsLoading(false);
    }
  };
  {
    /********************************************************************************/
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
      consultaion_fee: val,
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
      hospital: val.value,
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
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
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
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
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
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
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
            <FontAwesome name="user-o" color="#05375a" size={20} />
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
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your City"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(val) => handleRegionChange(val)}
            />
          </View>

          {/******************************      STREET ADDRESS     ***********************************/}
          {/* <Text style={[styles.text_footer, { marginTop: 35 }]}>Street Address</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Address"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => handleStreetAddressChange(val)}
            />
          </View> */}

          {/******************************      INSURANCE     ***********************************/}
          {/* <Text style={[styles.text_footer, { marginTop: 35 }]}>Insurance</Text>
          <View style={styles.action}>
            <Picker
              mode={"dialog"}
              selectedValue={data.insurance}
              style={{ height: 30, width: 150 }}
              onValueChange={(val) => {handleInsuranceChange(val);}}
            >
              <Picker.Item label="none" value={null} />
              <Picker.Item label="Axa" value="Axa" />
              <Picker.Item label="United" value="United" />
            </Picker>
          </View> */}

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

            {/*             
            <Picker
              mode={"dialog"}
              selectedValue={data.specialization}
              style={{ height: 100, width: '100%' }}
              onValueChange={(val) => {handleSpecializationChange(val);}}
            >
              <Picker.Item label="none" value={null} />
              <Picker.Item label="Allergy and immunology" value="Allergy and immunology" />
              <Picker.Item label="Anesthesiology" value="Anesthesiology" />
              <Picker.Item label="Dermatology" value="Dermatology" />
              <Picker.Item label="Diagnostic radiology" value="Diagnostic radiology" />
              <Picker.Item label="Emergency medicine" value="Emergency medicine" />
              <Picker.Item label="Family medicine" value="Family medicine" />
              <Picker.Item label="Internal medicine" value="Internal medicine" />
              <Picker.Item label="Medical genetics" value="Medical genetics" />
              <Picker.Item label="Neurology" value="Neurology" />
              <Picker.Item label="Nuclear medicine" value="Nuclear medicine" />
              <Picker.Item label="Obstetrics and gynecology" value="Obstetrics and gynecology" />
              <Picker.Item label="Ophthalmology" value="Ophthalmology" />
              <Picker.Item label="Pathology" value="Pathology" />
              <Picker.Item label="Pediatrics" value="Pediatrics" />
              <Picker.Item label="Physical medicine and rehabilitation" value="Physical medicine and rehabilitation" />
              <Picker.Item label="Preventive medicine" value="Preventive medicine" />
              <Picker.Item label="Psychiatry" value="Psychiatry" />
              <Picker.Item label="Radiation oncology" value="Radiation oncology" />
              <Picker.Item label="Surgery" value="Surgery" />
              <Picker.Item label="Urology" value="Urology" />
            </Picker> */}
          </View>

          {/******************************      HOSPITAL     ***********************************/}
          <Text style={[styles.text_footer, { marginTop: 20 }]}>Hospital</Text>
          <View style={{ marginTop: 10 }}>
            <DropDownPicker
              listMode="MODAL"
              open={hospitalOpen}
              value={data.hospital}
              items={hospitalItems}
              setOpen={setHospitalOpen}
              onSelectItem={(val) => {
                handleHospitalChange(val);
              }}
            />
          </View>

          {/******************************     QUALIFICATIONS SECTION     ***********************************/}

          <Text style={styles.qualificationsStyle}>Qualifications:</Text>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>
            Qualification Name
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your City"
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
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your City"
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
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your City"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) =>
                handleQualificationsProcurementYearChange(val)
              }
            />
          </View>

          {/******************************      SIGN UP   --BUTTON--     ***********************************/}
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#087ed4",
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
  qualificationsStyle:{
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
    marginTop:40,
  },
});

export default DoctorSignUpScreen;
