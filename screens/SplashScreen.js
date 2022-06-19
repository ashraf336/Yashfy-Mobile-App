import React from "react";
import { View, Text,Image, Button, StyleSheet, Dimensions , TouchableOpacity,StatusBar } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
       <Animatable.Image
       animation="bounceIn"
       duration= {2000}
       source={require("../assets/logo2.png")}
       style={styles.logo}
       resizeMode="stretch"
       />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Welcome to Yashfy </Text>
        <Text style={styles.text}>  Please Sign in with your account</Text>
        <View style={styles.button}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
          <Text style={styles.textSign}>Patient</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
          </LinearGradient>
        </TouchableOpacity>
        </View>
        {/* <Text style={styles.text}>Are you a Doctor?</Text> */}
        <View style={styles.button}>
        <TouchableOpacity onPress={()=>navigation.navigate('DoctorSignInScreen')}>
          <LinearGradient colors={['#087ed4', '#087ed4']} style={styles.signIn}>
          <Text style={styles.textSign}>Doctor</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
          </LinearGradient>
        </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  button_doctor: {
    alignItems: "flex-start",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SplashScreen;
