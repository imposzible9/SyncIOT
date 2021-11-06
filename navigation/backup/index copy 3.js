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
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
 } from '@react-navigation/drawer';
 
 
 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
 import ModalScreen from '../screens/ModalScreen';
 import LefeMenuScreen from '../screens/LefeMenuScreen';
 import NotFoundScreen from '../screens/NotFoundScreen';
 import TabOneScreen from '../screens/TabOneScreen';
 import TabTwoScreen from '../screens/TabTwoScreen';
 
 
 import DrawerContent from '../screens/DrawerContent';
 
 import { View, Button, Text } from 'react-native';
 
 /*
 import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
 */
 const LinkingConfiguration = '';
 
 export default function Navigation(colorScheme) {
 
   //console.log(LinkingConfiguration,colorScheme)
   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={DefaultTheme}>
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 /*
 
 <RootStack.Navigator>
       <RootStack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
       <RootStack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
       <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
       <RootStack.Group screenOptions={{ presentation: 'modal' }}>
       
         <RootStack.Screen name="Modal" component={ModalScreen} />
       </RootStack.Group>
 </RootStack.Navigator>

       */
 
 const RootStack = createNativeStackNavigator();
 
 function RootNavigator() {
   return (
    <RootStack.Navigator>
        <RootStack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
 
    
 
   );
 }
 /*
 */
 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */
 
 const BottomTab = createBottomTabNavigator();
 
 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="TabOne"
       activeColor="#fff"
       >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneStackScreen}
        options={({ navigation }) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         
          headerLeft: () => (
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="user-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
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
 
 
 const Drawer = createDrawerNavigator();
 
 function DrawerNavigator() {
   return (
     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
       <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator} />
 
     </Drawer.Navigator>
 
   );
 }


 function TabOneStackScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home!</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Button
        title="Toggle Drawer"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Button
        title="Jump to Profile"
        onPress={() => navigation.dispatch(jumpToAction)}
      />
    </View>
  );
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 /**/
 function TabBarIcon(props) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 