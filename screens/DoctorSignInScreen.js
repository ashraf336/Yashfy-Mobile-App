import React from "react";
import {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../components/context";
import { ActivityIndicator } from 'react-native';

import axios from "axios";
const baseUrl = "http://192.168.1.12:8080"; //Devolopment

const DoctorSignInScreen = ({navigation}) => {

const [data, setData] = React.useState({
    email: "",
    password: "",
    secureTextEntry: true,
    isValidEmail: true, 
    isValidPassword: true,
  });

const {signIn} = React.useContext(AuthContext);

const [fetchapi, setfetchapi] = useState(false);

let submission = {
    email: data.email,
    password: data.password,
  }

let dummyFoundUser={
  id:"123",
  token:"123456",
  isDoctor: true,
};   
{/******************************     Handle input Fields Change    ***********************************/}

const textInputChange = (val) => {      //email need to edit  field
    let emailCheck = ValidateEmail(val)
      setData({
        ...data,
        email: val,
        isValidEmail: emailCheck
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
// show hide/show in passeord field
const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

{/******************************     Login API Call    ***********************************/}

const loginHandle = async (email, password) => {
  setfetchapi(true);
  // validate empty
  if ( data.email.length == 0 || data.password.length == 0 ) {
    Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        {text: 'Okay'}
    ]);
    setfetchapi(false);
    return;
  }
    submission.email=email
    submission.password = password
    //CALLING API RETURN TOKEN
    try {
      console.log(" Calling API ....")
      const response = await axios.post(`${baseUrl}/doctors-auth/doctor-login`, submission);
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

{/******************************    VIEWS    ***************************************************************/}

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor='#087ed4' barStyle="light-content"/>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome Doctor !</Text>
      </View>

{/******************************    Email    ***********************************/}

      <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your email"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.isValidEmail ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        { data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}> must be valid email.</Text>
            </Animatable.View>
            }

{/******************************    Password    ***********************************/}
        <Text
          style={[
            styles.text_footer,
            {
              // color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
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
            
          <View style={styles.loading}>
          {fetchapi && <ActivityIndicator size="large" color="#087ed4"  /> }
          </View>

{/******************************    SIGN IN Button    ***********************************/}
  
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              signIn(dummyFoundUser)
              // loginHandle(data.email,data.password)


              // loginHandle(data.username, data.password);
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
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{flexDirection:"row" , alignItems:"center"}}>      
          <Text style={styles.text}>Doesn't have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("DoctorSignUpScreen")}
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
              Sign Up
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

{/******************************     VIEWS STYLES    ***********************************/}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center', flexDirection: "row",
    justifyContent: "space-around",  paddingTop: .5
  },
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
    fontSize:15,
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

export default DoctorSignInScreen;
