import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import apiAxios from '../../api/api';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Main: undefined;
};

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const expiration = await AsyncStorage.getItem('expiration');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const expirationRefreshToken = await AsyncStorage.getItem(
        'expiration_refresh_token',
      );
      const remember = await AsyncStorage.getItem('remember');

      if (accessToken && expiration && remember === 'true') {
        const expirationDate = new Date(expiration);
        const now = new Date();

        if (expirationDate > now) {
          setIsLoggedIn(true);
        } else if (refreshToken && expirationRefreshToken) {
          const expirationGetDate = new Date(expiration);

          if (now > expirationGetDate) {
            try {
              const response = await apiAxios.put('/auth/refresh', {
                refresh_token: refreshToken,
              });
              if (response.status === 200) {
                const newAccessToken = response.data[0];
                const newExpiration = response.data[1];
                await AsyncStorage.setItem('accessToken', newAccessToken);
                await AsyncStorage.setItem('expiration', newExpiration);
                setIsLoggedIn(true);
              }
            } catch (error) {
              console.error('Error refreshing token', error);
              setIsLoggedIn(false);
            }
          } else {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('expiration');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('expiration_refresh_token');
            setIsLoggedIn(false);
          }
        } else {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('expiration');
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAndRefreshToken();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(isLoggedIn ? 'Main' : 'Login');
    }, 6000);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
        autoPlay
        loop={true}
        onAnimationFinish={() =>
          navigation.replace(isLoggedIn ? 'Main' : 'Login')
        }
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  animation: {
    width: 350,
    height: 350,
  },
});

export default SplashScreen;
