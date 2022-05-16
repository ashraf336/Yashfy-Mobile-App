import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './Patient Screens/SignInScreen';
import SignUpScreen from './Patient Screens/SignUpScreen';
import DoctorSignInScreen from './Doctor Screens/DoctorSignInScreen';
import DoctorSignUpScreen from './Doctor Screens/DoctorSignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator  screenOptions={{headerShown: false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="DoctorSignInScreen" component={DoctorSignInScreen}/>
        <RootStack.Screen name="DoctorSignUpScreen" component={DoctorSignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;