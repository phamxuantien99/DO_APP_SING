import React from 'react';
import {Text, View} from 'react-native';
import HeadingAccount from '../HeadingAccount';
const AboutApp = () => {
  return (
    <View>
      <HeadingAccount text="About App" />
      <View
        style={{
          marginTop: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
        <Text
          style={{fontSize: 20, color: 'black', fontFamily: 'Roboto-Regular'}}>
          Detail version: 1.0.1
        </Text>
        <Text
          style={{fontSize: 20, color: 'black', fontFamily: 'Roboto-Regular'}}>
          Date update: 31/10/2024
        </Text>
      </View>
    </View>
  );
};

export default AboutApp;
