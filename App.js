import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./screens/DrawerContent";
import "react-native-gesture-handler";

import MainTabScreen from "./screens/MainTabScreen";
import SupportScreen from "./screens/SupportScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import SingleDoctorScreen from "./screens/SingleDoctorScreen";

import { AuthContext } from "./components/context";

import RootStackScreen from "./screens/RootStackScreen";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator(); 

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);


  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };


  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  
const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken("asdf");
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
        try {
          
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        }

        
      
      dispatch({type:'LOGIN' , id:userName, token:userToken});

    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
       
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }


      dispatch({type:'LOGOUT' });
    },
    signUp: () => {
      setUserToken("asdf");
      setIsLoading(false);
    },
  }),[]);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken=null;
      try {
        userToken=await AsyncStorage.getItem('userToken');
        
      } catch (e) {
        console.log(e);
      }

      dispatch({type:'RETRIEVE_TOKEN' , token:userToken}); 
      // setIsLoading(false);
    }, 1000);
  }, []);

  if ( loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            headerMode="screen"
            screenOptions={{
              headerShown: true,
              headerStyle: { backgroundColor: "#009387" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
              headerShown: true,
            }}
          >
            <Drawer.Screen
              name="DrawerHome"
              component={MainTabScreen}
              options={{ title: "Home" }}
            />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            <Drawer.Screen name="SingleDoctorScreen" component={SingleDoctorScreen} />
          </Drawer.Navigator>
        ) : 
          <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

