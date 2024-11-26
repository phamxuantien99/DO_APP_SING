import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/AuthContext';

export const getPassword = async () => {
  try {
    const passowrd = await AsyncStorage.getItem('nameUserInfo');
    if (passowrd !== null) {
      return passowrd;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch the password from storage', error);
    return null;
  }
};

export const getPassword1 = async () => {
  try {
    const passowrd = await AsyncStorage.getItem('userInfo');
    return passowrd != null ? JSON.parse(passowrd) : null;
  } catch (error) {
    console.error('Failed to fetch the password from storage', error);
    return null;
  }
};

export default function Header() {
  const [userName, setUserName] = React.useState<string>('');
  const {setUserInfo} = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const valueUser = await getPassword();
      setUserName(valueUser as string);
    };

    getUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const valueUser = await getPassword1();
      setUserInfo(valueUser as any);
    };

    getUser();
  }, []);

  return (
    <View>
      <View style={{position: 'relative'}}>
        <Image
          source={require('../assets/images/ImageHome.jpg')}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/OnlyLogo.png')}
            style={{width: 55, height: 55}}
          />
          {/* style={{backgroundColor: '#0F7CBF', padding: 5}} */}
          <View>
            <Text
              style={{
                color: 'white',
                // fontSize: 20,
                fontFamily: 'Roboto-Regular',
                fontWeight: '700',
              }}>
              Welcome,
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 25,
                fontFamily: 'Nunito-Italic-VariableFont_wght',
              }}>
              {userName?.toUpperCase()}
            </Text>
          </View>
        </View>
        <Icon name="bell" size={27} color={'#03adfc'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#27B770',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    padding: 20,
    paddingTop: 30,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
