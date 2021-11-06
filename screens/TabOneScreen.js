import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

import * as theme from '../theme';
import { Text } from '../components';
import mocks from '../settings';

import i18n from 'i18n-js';

export default function TabOneScreen() {

  //const { navigation, settings } = this.props;
  /*
  const LightIcon = settings['light'].icon;
  const ACIcon = settings['ac'].icon;
  const TempIcon = settings['temperature'].icon;
  const FanIcon = settings['fan'].icon;
  const WiFiIcon = settings['wi-fi'].icon;
  const ElectricityIcon = settings['electricity'].icon;
  */
  return (

    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('welcome')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});