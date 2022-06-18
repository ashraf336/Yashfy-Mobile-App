import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
const Tab = createMaterialBottomTabNavigator();

import DetailsScreen from "../DetailsScreen";
import HomeScreen from "../HomeScreen";
import ProfileScreen from "./ProfileScreen";
import ExploreScreen from "../ExploreScreen";
import SingleDoctorScreen from "../SingleDoctorScreen";
import SearchScreen from "./SearchScreen"
import AppointmentsScreen from "./AppointmentsScreen";

// const HomeStack = createNativeStackNavigator();
// const DetailsStack = createNativeStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Search"
    activeColor="#fff"
      barStyle={{ backgroundColor: '#009387' }}
  
  >
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarLabel: "Search",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="search" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#778899",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />    
    <Tab.Screen
      name="Appointments"
      component={AppointmentsScreen}
      options={{
        tabBarLabel: "Appointments",
        tabBarColor: "#8a2be2",
        tabBarIcon: ({ color }) => (
          <Icon name="md-calendar-sharp" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Explore"
      component={SingleDoctorScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "#fa8072",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

export default MainTabScreen;

