import React, { useState, useEffect } from "react";
import { Text } from 'react-native'
//import * as Permissions from "expo-permissions";
//import axios from "axios";
import { AsyncStorage } from "react-native";


const UserContext = React.createContext();
export default UserContext;
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
    <UserContext.Provider
      value={{
        isSignedIn, // well use this for conditional rendering

        check_and_set_signin_status,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};