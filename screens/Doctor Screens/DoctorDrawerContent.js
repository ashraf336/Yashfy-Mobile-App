import React, { useState } from "react";
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
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
//const baseUrl = "https://test-api-yashfy.herokuapp.com"; // production 
const baseUrl = "http://192.168.1.12:8080"; //DeVolopment
import { AuthContext } from "../../components/context";

export function DoctorDrawerContent(props) {

  {/******************************      API Call  Handlers  ***********************************/}
const fetchDoctorDataHandle = async ( token) => {

  //CALLING API RETURN data 
  try {
    console.log(" ....... Calling API (Fetch Doctor data)......")
    const response = await axios.get(`${baseUrl}/doctors/profile`, {
      headers: {
        'Authorization': `bearer ${token}` 
      }
    });

    // { url , body , headear , config } for maore deatils visit docs
    if (response.status === 200) {
     // console.log(` Response: ${JSON.stringify(response.data)}`);
      console.log(` Doctor data is fetched`);
      // Set the data with fetched data
      return response.data.doctor    
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
const [data, setData] = useState({
  username: " ",
  first_name: " ",
  last_name: " ",
  specialization: " "
});  
useEffect(() => {
  //Runs only on the first render
// Fetch Token
AsyncStorage.multiGet(['userToken','isDoctor']).then(res =>
{
    // Fetch All Data
  const promise = fetchDoctorDataHandle(res[0][1]);
  promise.then(doctortData => {
    setData(
      {
        ...data,
        username: doctortData.username,
        first_name: doctortData.first_name,
        last_name : doctortData.last_name,
        specialization: doctortData.specialization

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
                  require("../../assets/doctor1.png")
                  // {uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'}
                }
                size={100}
              />
              <View style={{ marginLeft: 15, flexDirection: "column",flexShrink:1 }}>
                <Title style={styles.title}>Dr.{data.first_name} {data.last_name}</Title>
                <Caption style={[styles.caption ]}>Consultant of {data.specialization}</Caption>
              </View>
            </View>
          </View>

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
                <Icon name="calendar-month" color={color} size={size} />
              )}
              label="Appointments"
              onPress={() => {
                props.navigation.navigate("Appointments");
              }}
            />            
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
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
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
