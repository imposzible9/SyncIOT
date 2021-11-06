import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';




export default function NotFoundScreen() {
  return (
   
      <View style={styles.container}>
        <Text onPress={()=>{setBgColor(5667)}}>Color scheme: </Text>
         
        </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
