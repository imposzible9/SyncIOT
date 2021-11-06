import React, { useState, useEffect, useContext } from "react";
import { Text } from 'react-native'
//import * as Permissions from "expo-permissions";
//import axios from "axios";
import { AsyncStorage } from "react-native";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { langObj } from '../language'


const AuthContext = React.createContext();
export default AuthContext;





i18n.translations = langObj;
/*
 i18n.translations = {
  en: langObj.en,
  ja: { welcome: 'こんにちは' },
  th: langObj.th
}
*/
i18n.locale = Localization.locale;
i18n.fallbacks = true;

//const x1 = i18n.t('welcome');
//console.log(x1,"TranSlation")
//console.log(langObj, "langObj")
//console.log(testObj, "testObj")





