import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./screens/Patient Screens/DrawerContent";
import { DoctorDrawerContent } from "./screens/Doctor Screens/DoctorDrawerContent";
import "react-native-gesture-handler";
import MainTabScreen from "./screens/Patient Screens/MainTabScreen";
import DoctorMainTabScreen from "./screens/Doctor Screens/DoctorMainTabScreen";

import SingleDoctorScreen from "./screens/SingleDoctorScreen";
import DoctorProfileScreen from "./screens/Doctor Screens/DoctorProfileScreen";
import SearchScreen from "./screens/Patient Screens/SearchScreen";
import AppointmentsScreen from "./screens/Patient Screens/AppointmentsScreen";
import { AuthContext } from "./components/context";
import RootStackScreen from "./screens/RootStackScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator(); 
const DoctorDrawer = createDrawerNavigator(); 

function App() {

  const initialLoginState = {
    userID: null,
    userToken: null,
    isDoctor:null,
  };


  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isDoctor: action.isDoctor,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
          isDoctor:action.isDoctor,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userID: null,
          userToken: null,
          isDoctor:null,
                };
      case 'REGISTER': 
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token, 
          isDoctor: action.isDoctor  };
    }
  };
  
const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {

      console.log("response in app:",foundUser)
      const userToken = String(foundUser.token);
      const userID = foundUser.id;
      const isDoctor= foundUser.isDoctor;
        try {
          //Store  token
          await (AsyncStorage.multiSet([['userToken', userToken] , ['isDoctor', JSON.stringify( isDoctor)]]))
           
        } catch (e) {
          console.log(e);
        } 
      dispatch({type:'LOGIN' , id:userID, token:userToken , isDoctor:isDoctor});

    },
    signOut: async() => {
      try {
        await (AsyncStorage.multiRemove(['userToken', 'isDoctor']))
      } catch (e) {
        console.log(e);
      }
      dispatch({type:'LOGOUT' });
    },
    //WHY?
    /*signUp: () => {
      setUserToken("asdf");
      setIsLoading(false);
    },
    */
  }),[]);

  // Keep sign in if token still valid  
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken=null;
      let isDoctor;
      isDoctor=null;
      try {
        // userToken=await AsyncStorage.getItem('userToken' );
        let res = await AsyncStorage.multiGet(['userToken','isDoctor'] );
        userToken = res[0][1];
        isDoctor = JSON.parse(res[1][1]);
      } catch (e) {
        console.log(e);
      }

      dispatch({type:'RETRIEVE_TOKEN' , token:userToken , isDoctor:isDoctor}); 
      // setIsLoading(false);
    }, 1000);
  }, []);
  
  

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          loginState.isDoctor == false?(
            // PATIENT's Successful sign in path
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            // headerMode="screen"
            screenOptions={{
              headerStyle: { backgroundColor: "#009387", height:25 },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
              headerShown: true,
            }}
          >
            <Drawer.Screen  name="DrawerHome" component={MainTabScreen} options={{ title: "" }}/>
            <Drawer.Screen name="SingleDoctorScreen" component={SingleDoctorScreen} options={{ title: "" }} />
            <Drawer.Screen name="SearchScreen" component={SearchScreen} options={{ title: "" }} />
            <Drawer.Screen name="AppointmentsScreen" component={AppointmentsScreen} options={{ title: "" }} />
          </Drawer.Navigator>
          )
          :( // DOCTOR's Successful sign in path
          <DoctorDrawer.Navigator
            drawerContent={(props) => <DoctorDrawerContent {...props} />}
            screenOptions={{
              headerStyle: { backgroundColor: "#087ed4", height:25 },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
              headerShown: true,
            }}
          >
             <Drawer.Screen  name="DrawerHome" component={DoctorMainTabScreen} options={{ title: "" }}/>
             
             <Drawer.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} options={{ title: "Profile" }}/>
          </DoctorDrawer.Navigator>)
        ) 
        // Default Logged out path
        : <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

