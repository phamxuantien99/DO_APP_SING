import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  text: string;
}

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

const HeadingAccount: React.FC<Props> = ({text}) => {
  const [userName, setUserName] = React.useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const valueUser = await getPassword();
      setUserName(valueUser as string);
    };

    getUser();
  }, []);

  return (
    <LinearGradient
      style={{padding: 20, paddingTop: 30}}
      colors={['#F2F2F2', '#F2F2F2']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            fontFamily: 'Roboto-Regular',
            textTransform: 'capitalize',
          }}>
          {text}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginTop: 8,
            fontFamily: 'Nunito-Italic-VariableFont_wght',
          }}>
          {userName?.toUpperCase()}
        </Text>
      </View>

      <View>
        <LinearGradient
          colors={['#03adfc', '#03fc6f']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Regular',
              textTransform: 'uppercase',
              paddingLeft: 30,
              paddingVertical: 10,
            }}>
            Delta Tech Group
          </Text>
        </LinearGradient>
        <Image
          source={require('../../assets/images/ImageHome.jpg')}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default HeadingAccount;
