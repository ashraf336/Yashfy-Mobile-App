import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
const Tab = createMaterialBottomTabNavigator();

import DoctorProfileScreen from "./DoctorProfileScreen";
import SupportScreen from "../SupportScreen";
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
      barStyle={{ backgroundColor: 'tomato' }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        tabBarLabel: "Updates",
        tabBarColor: "#8a2be2",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />      
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
    {/* <Tab.Screen
      name="Support"
      component={SupportScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "black",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    /> */}
        <Tab.Screen
      name="Explore"
      component={SingleDoctorScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "#fa8072",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  
    
  </Tab.Navigator>
);

export default DoctorMainTabScreen;
