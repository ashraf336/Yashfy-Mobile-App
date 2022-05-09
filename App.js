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

  const initialLoginState = {
    userID: null,
    userToken: null,
  };


  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userID: null,
          userToken: null,
                };
      case 'REGISTER': 
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,        };
    }
  };
  
const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {

      console.log("response in app:",foundUser)
      const userToken = String(foundUser.token);
      const userID = foundUser.id;
        try {
          //Store  token
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        } 
      dispatch({type:'LOGIN' , id:userID, token:userToken});

    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken')
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
      try {
        userToken=await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({type:'RETRIEVE_TOKEN' , token:userToken}); 
      // setIsLoading(false);
    }, 1000);
  }, []);
  
  

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

