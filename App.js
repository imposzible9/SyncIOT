//import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
//import i18n1 from './language/i18n'
//import UserContext, { UserProvider } from "./components/UserContext";
import AuthContext from "./components/context";


import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';


import ProcessScreen from './screens/ProcessScreen';

import { NavigationContainer } from '@react-navigation/native';
import I18n from 'i18n-js';



const App = () => {
  const isLoadingComplete = useCachedResources();
  //const colorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  //console.log(colorScheme );

  /*
  const langOptions = [
    { label: 'English', value: 'en' },
    { label: 'Thailand', value: 'th' },
  ];
  */

  const initLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
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

  const [loginState, dispatch] = React.useReducer(loginReducer, initLoginState);
  //const [showBox, setShowBox] = useState(true);

  const STYLES = ['default', 'dark-content', 'light-content'];
  const TRANSITIONS = ['fade', 'slide', 'none'];

  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  const setShowBox = async () => {
    /**/
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: 'LOGOUT' });

    //alert(120)
  }

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser.userToken);
      const userName = foundUser.username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      /*
      return Alert.alert(
        I18n.t("logoutHead"),
        "",
        [
          // The "Yes" button
          {
            text: I18n.t("Yes"),
            onPress: () => {
              setShowBox();
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: I18n.t("No"),
          },
        ]
      );
      */
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });


    },
    /*
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    */



    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }



  return (
    <SafeAreaProvider>

      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext} >
          <NavigationContainer theme={theme}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              barStyle={statusBarStyle}
              showHideTransition={statusBarTransition}
              hidden={hidden}
            />
            {loginState.userToken !== null ? (
              <Navigation theme={theme} />

            ) : (
              <ProcessScreen />
            )}
          </NavigationContainer>

        </AuthContext.Provider>
      </PaperProvider>




    </SafeAreaProvider>
  );



};

export default App;


