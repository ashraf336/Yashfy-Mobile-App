import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
const Tab = createMaterialBottomTabNavigator();

import DoctorProfileScreen from "./DoctorProfileScreen";
import DoctorAppointmentsScreen from "./DoctorAppointmentsScreen";
import DetailsScreen from "../DetailsScreen";
import HomeScreen from "../HomeScreen";
// import ProfileScreen from "./ProfileScreen";
// import ExploreScreen from "./ExploreScreen";
import SingleDoctorScreen from "../SingleDoctorScreen";

// const HomeStack = createNativeStackNavigator();
// const DetailsStack = createNativeStackNavigator();

const DoctorMainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    activeColor="#fff"
      barStyle={{ backgroundColor: '#009387' }}
  >

    <Tab.Screen
      name="Profile"
      component={DoctorProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#8a2be2",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
        <Tab.Screen
      name="Appointments"
      component={DoctorAppointmentsScreen}
      options={{
        tabBarLabel: "Appointments",
        tabBarColor: "#fa8072",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  
    
  </Tab.Navigator>
);

export default DoctorMainTabScreen;
