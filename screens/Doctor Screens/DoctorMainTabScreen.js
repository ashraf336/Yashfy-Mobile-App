import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
const Tab = createMaterialBottomTabNavigator();

import DoctorProfileScreen from "./DoctorProfileScreen";
import DoctorAppointmentsScreen from "./DoctorAppointmentsScreen";



const DoctorMainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    activeColor="#fff"
      barStyle={{ backgroundColor: '#087ed4' }}
  >

    <Tab.Screen
      name="Profile"
      component={DoctorProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#087ed4",
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
        tabBarColor: "#087ed4",
        tabBarIcon: ({ color }) => (
          <Icon name="md-calendar-sharp" color={color} size={26} />
        ),
      }}
    />
  
    
  </Tab.Navigator>
);

export default DoctorMainTabScreen;
