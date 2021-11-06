import React, { useState, useEffect, useContext } from "react";
import { Text } from 'react-native'
//import * as Permissions from "expo-permissions";
//import axios from "axios";
import { AsyncStorage } from "react-native";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import en from '../language/en.json';
import th from '../language/th.json';

import { langObj } from '../language'



const AuthContext = React.createContext();


export default AuthContext;


i18n.translations = langObj;

/*
 const testObj = {
  en: langObj.en,
  ja: { welcome: 'こんにちは' },
  th: langObj.th
}
*/
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const x1 = i18n.t('welcome');

console.log(x1,"TranSlation")
//console.log(langObj, "langObj")
//console.log(testObj, "testObj")

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



export const LanguageContext = React.createContext();



export const LanguageContextProvider = ({ children }) => {

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = 'th-TH';
    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const values = {
    ...languageOptions[selectedLanguage],
  };

  return (

    <LanguageContext.Provider value={{
      values
    }}>
      {children}
    </LanguageContext.Provider>

  );

}

export const useTranslation = () => useContext(LanguageContext);

/*

const LanguageContextProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = 'th-TH';

    RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );


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



 */



