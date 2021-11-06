import React, { useState, useEffect, useContext } from "react";
import { Text } from 'react-native'
//import * as Permissions from "expo-permissions";
//import axios from "axios";
import { AsyncStorage } from "react-native";
import * as Localization from 'expo-localization';

import en from '../language/en.json';
import th from '../language/th.json';


const AuthContext = React.createContext();
export default AuthContext;


const languageOptions = {
  'en':{ label: 'English', value: 'en' },
  'th-TH':{ label: 'Thailand', value: 'th' },
};

const allowed = [Localization.locale];

const currentLanguage = Object.keys(languageOptions)
  .filter(key => allowed.includes(key))
  .reduce((obj, key) => {
    obj[key] = languageOptions[key];
    return obj;
  }, {});

//console.log(Localization.locale);



const LanguageContext = React.createContext();


export const AuthProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  useEffect(() => {
    const currentLanguage = 'th-TH';
    /*
    RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );
    */

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);
  
 
  const values = {
    ...languageOptions[selectedLanguage],
  };
  return (
    <AuthContext.Provider value={{
      values
    }} >
     
      <LanguageContext>
      {children}
      </LanguageContext>
      
    </AuthContext.Provider>
  );
};

export const useTranslation = () => useContext(AuthContext);






/*
const IS_SIGNEDIN = "is_signed_in";

export const UserProvider = ({ children }) => {
  const [isSignedIn, setSignIn] = useState(null);
  const [didAuthenticate, setAuthenticated] = useState(null);

  const check_and_set_signin_status = async () => {
    const signed_in = await AsyncStorage.getItem(IS_SIGNEDIN);

    if (signed_in == null || signed_in == "false") {
      await AsyncStorage.setItem(IS_SIGNEDIN, "false");
      setSignIn("false");
    } else {
      setSignIn("true");
    }

  };


  return (
    <AuthContext.Provider
      value={{
        isSignedIn, // well use this for conditional rendering

        check_and_set_signin_status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
*/