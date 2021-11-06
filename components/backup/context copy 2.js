import React, { useState, useEffect, useContext } from "react";
import { Text } from 'react-native'
//import * as Permissions from "expo-permissions";
//import axios from "axios";
import { AsyncStorage } from "react-native";
import * as Localization from 'expo-localization';

import en from '../language/en.json';
import th from '../language/th.json';


const AuthContext = React.createContext();
const LanguageContext = React.createContext();

export default AuthContext;


const languageOptions = {
  'en': { label: 'English', value: 'en' },
  'th-TH': { label: 'Thailand', value: 'th' },
};

const allowed = [Localization.locale];

const currentLanguage = Object.keys(languageOptions)
  .filter(key => allowed.includes(key))
  .reduce((obj, key) => {
    obj[key] = languageOptions[key];
    return obj;
  }, {});

console.log(currentLanguage);
//console.log(Localization.locale);





const LanguageContextProvider = ({ children }) => {
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
    <AuthContext.Provider value={value}>
      <LanguageContext.Provider value={values}>
        {children}
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
};

export const AppContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={value}>
      <LanguageContext.Provider value={values}>
        {children}
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);






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