import React from 'react';
import { StatusBar } from 'expo-status-bar';
//import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Processtack = createNativeStackNavigator();

function ProcessScreen() {
    return (
        <Processtack.Navigator headerMode='none' initialRouteName="SignInScreen">
            <Processtack.Screen name="SplashScreen" component={SplashScreen} />
            <Processtack.Screen name="SignInScreen" component={SignInScreen} />
            <Processtack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Processtack.Navigator>

    );
}

export default ProcessScreen;