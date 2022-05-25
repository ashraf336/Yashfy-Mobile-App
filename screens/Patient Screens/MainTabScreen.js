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

// const HomeStack = createNativeStackNavigator();
// const DetailsStack = createNativeStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Search"
    activeColor="#fff"
      barStyle={{ backgroundColor: 'tomato' }}
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

export default MainTabScreen;

// const HomeStackScreen = ({ navigation }) => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: { backgroundColor: "#009387" },
//       headerTintColor: "#fff",
//       headerTitleStyle: { fontWeight: "bold" },
//     }}
//   >
//     <HomeStack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         title: "Overview",
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigation.openDrawer()}
//           ></Icon.Button>
//         ),
//         headerShown: true,
//       }}
//     />
//   </HomeStack.Navigator>
// );

// const DetailsStackScreen = ({ navigation }) => (
//   <DetailsStack.Navigator
//     screenOptions={{
//       headerStyle: { backgroundColor: "#009387" },
//       headerTintColor: "#fff",
//       headerTitleStyle: { fontWeight: "bold" },
//       headerShown: true,
//     }}
//   >
//     <DetailsStack.Screen
//       name="Details"
//       component={DetailsScreen}
//       options={{}}
//     />
//   </DetailsStack.Navigator>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
