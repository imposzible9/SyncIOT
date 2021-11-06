import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator,
    Animated

} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import AuthContext, { LanguageContext } from '../components/context';

import Users from '../model/users';

import axios from 'axios';

import APIKit, { setClientToken } from '../config/api';


const DismissKeyboard = ({ children }) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);
/*
TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
*/

const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();
    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }


        const payload = { username: data.username, password: data.password };

        const onSuccess = ({ data }) => {
            console.log(data.data);
            //Set JSON Web Token on success
            //setClientToken(data.token);
            //this.setState({ isLoading: false, isAuthorized: true });
            //setIsLoading(true);
            setTimeout(() => {
                //signIn(data.data);
            }, 1000);
            return;
        };

        const onFailure = error => {
            console.log(error && error.response);
            //this.setState({ errors: error.response.data, isLoading: false });
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            setIsLoading(false);
            return;
        };



        setIsLoading(true);
        setTimeout(() => {
            navigation.setOptions({ headerShown: true });
            APIKit.post('/api/user', payload)
                .then(onSuccess)
                .catch(onFailure);

            IsProcessState({
                ...ProcessState,
                animation: {
                    animate: "",
                    opacity: 1
                }
            })
        }, 100);
        //setIsLoading(false);
        navigation.setOptions({ headerShown: false });

        //console.log(foundUser[0], "foundUser");
        /*
          if (foundUser.length == 0) {
              Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                  { text: 'Okay' }
              ]);
              return;
          }
          
          signIn(foundUser);
          */

    }

    useEffect(() => {
        //setIsLoading(!IsLoading);
    }, []);


    const [IsLoading, setIsLoading] = React.useState(false);
    const [ViewProcess, setViewProcess] = React.useState({
        opacity: 0.1,
    });

    const [ProcessState, IsProcessState] = React.useState({
        IsLoading: false,
        animation: {
            animate: "fadeInUpBig",
            opacity: 0.5
        }
    });

    const renderLoading = async () => {

        setIsLoading(true);
        setTimeout(() => {
            navigation.setOptions({ headerShown: true });
            setIsLoading(false);
        }, 2000);

        navigation.setOptions({ headerShown: false });

    }

    return (
        <DismissKeyboard >
            {IsLoading !== true ? (
                <View style={[styles.container]}>

                    <View style={styles.header}>
                        <Text style={styles.text_header}>Welcome!</Text>
                    </View>

                    <Animatable.View
                        animation={ProcessState.animation.animate}
                        style={[styles.footer, {
                            backgroundColor: colors.background,
                            opacity: ProcessState.animation.opacity
                        }]}
                    >
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Username</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Username"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                                value={data.username}
                            />
                            {data.check_textInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                        {data.isValidUser ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                            </Animatable.View>
                        }

                        <Text style={[styles.text_footer, {
                            color: colors.text,
                            marginTop: 35
                        }]}>Password</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Password"
                                placeholderTextColor="#666666"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handlePasswordChange(val)}
                                returnKeyType="go"
                                onSubmitEditing={() => { loginHandle(data.username, data.password) }}
                                value={data.password}
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                            >
                                {data.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    />
                                    :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        {data.isValidPassword ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                            </Animatable.View>
                        }


                        <TouchableOpacity>
                            <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                        </TouchableOpacity>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => { loginHandle(data.username, data.password) }}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]}>Sign In</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUpScreen')}
                                style={[styles.signIn, {
                                    borderColor: '#009387',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#009387'
                                }]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>


                </View>

            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
                    <Animatable.View
                        animation="zoomIn"
                        duration={1000}
                        style={[{
                            backgroundColor: colors.background,
                            opacity: 0.5
                        }]}>
                        <ActivityIndicator size="large" />
                    </Animatable.View>
                </View>
            )}



        </DismissKeyboard>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

});