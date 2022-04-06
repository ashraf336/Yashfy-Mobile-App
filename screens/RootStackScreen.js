import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import DoctorSignInScreen from './DoctorSignInScreen';
import DoctorSignUpScreen from './DoctorSignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="DoctorSignInScreen" component={DoctorSignInScreen}/>
        <RootStack.Screen name="DoctorSignUpScreen" component={DoctorSignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;