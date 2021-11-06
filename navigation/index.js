/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, DrawerLayoutAndroid, Pressable } from 'react-native';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import LefeMenuScreen from '../screens/LeftMenuScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';


import DrawerContent from '../screens/DrawerContent';

import { useTheme } from 'react-native-paper';

/*
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
*/
const LinkingConfiguration = '';


export default function Navigation(colorScheme) {
  //console.log(colorScheme.theme,"Them");
  //console.log(LinkingConfiguration,colorScheme)
  return (
    <RootNavigator />

  );
}
/*
 <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme.theme}
      >
      <RootNavigator />
    </NavigationContainer>
    */



/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();



function RootNavigator(props) {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '85%',
        },
      }}
    >
      <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator} options={{ headerShown: false }} test1={props => <BottomTab {...props} />} />
      <Drawer.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Drawer.Navigator>

  );
}

/*
*/
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */


function BottomTabNavigator(props) {
  //const colorScheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      activeColor="#fff"
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0 // Just in case.
          },
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerLeft: ({ color }) => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="user-circle"
                size={25}
                color={color}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
          headerRight: ({ color }) => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={color}
                style={{ marginRight: 15 }}
              />
            </Pressable>

          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
