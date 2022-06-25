import React, { useState } from "react";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext} from "../../components/context";
import axios from "axios";
//const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 
const baseUrl = "http://192.168.1.12:8080"; //DeVolopment


export function DrawerContent(props) {



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
const [data, setData] = useState({
  username: " ",
  first_name: " ",
  last_name: " ",
});  
useEffect(() => {
  //Runs only on the first render
// Fetch Token
AsyncStorage.multiGet(['userToken','isDoctor']).then(res =>
{
    // Fetch All Data
  const promise = fetchPatientDataHandle(res[0][1]);
  promise.then(patientData => {
    setData(
      {
        ...data,
        username: patientData.username,
        first_name: patientData.first_name,
        last_name : patientData.last_name,
      }
    )
  });

}
).catch(err=>{
console.log(err)
})
}, []);
 

  const { signOut } = React.useContext(AuthContext);
     
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={
                  require("../../assets/patient.jpg")
                  // {uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'}
                }
                size={60}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" ,flexShrink:1}}>
                <Title style={styles.title}>{data.first_name} {data.last_name}</Title>
                <Caption style={styles.caption}>@{data.username}</Caption>
              </View>
            </View>

          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              )}
              label="Search"
              onPress={() => {
                props.navigation.navigate("Search");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="md-calendar-sharp" color={color} size={size} />
              )}
              label="Appointments"
              onPress={() => {
                props.navigation.navigate("Appointments");
              }}
            />
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    flexShrink:1

  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
    flexShrink:1
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
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
