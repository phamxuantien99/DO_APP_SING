import CheckBox from '@react-native-community/checkbox';
import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {AuthContext, AuthContextType} from '../../context/AuthContext';
import {LinkingContext} from '@react-navigation/native';

export default function LoginScreen() {
  const [infoLogin, setInfoLogin] = React.useState({
    username: '',
    password: '',
    showPass: true,
    saveUser: false,
  });

  const {isLoading, login} = useContext(AuthContext) as AuthContextType;

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/fullLogo.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.textLogin}>WORK PROCESS CHECKING</Text>
      <View style={{flex: 2}}>
        <TextInput
          mode={'outlined'}
          style={styles.input}
          label={'Username'}
          value={infoLogin.username}
          onChangeText={text =>
            setInfoLogin({
              ...infoLogin,
              username: text,
            })
          }
          placeholderTextColor={'#00000040'}
          placeholder={'Enter Username'}
        />

        <TextInput
          mode={'outlined'}
          style={styles.input}
          label={'Password'}
          value={infoLogin.password}
          placeholderTextColor={'#00000040'}
          onChangeText={text =>
            setInfoLogin({
              ...infoLogin,
              password: text,
            })
          }
          secureTextEntry={infoLogin.showPass}
          placeholder={'Enter Password'}
          right={
            <TextInput.Icon
              onPress={() => {
                setInfoLogin({
                  ...infoLogin,
                  showPass: !infoLogin.showPass,
                });
              }}
              icon={'eye'}
            />
          }
        />

        <View style={styles.rememberMe}>
          <CheckBox
            disabled={false}
            value={infoLogin.saveUser}
            onValueChange={newValue => {
              setInfoLogin({
                ...infoLogin,
                saveUser: newValue,
              });
            }}
            tintColors={{true: '#22abe1', false: 'black'}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textItem}>Remember me</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            login(infoLogin.username, infoLogin.password, infoLogin.saveUser);
          }}>
          <Text style={styles.title}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.12}}>
        <Text style={styles.textVer}>Version: 1.0.1 | Date: 31/10/2024</Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },

  textItem: {
    fontSize: '16@ms',
    color: 'black',
  },

  textLogin: {
    fontWeight: 'bold',
    fontSize: '22@ms',
    marginTop: '20@vs',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#0d75be',
    marginBottom: '20@vs',
    fontFamily: 'Roboto',
  },
  rememberMe: {
    marginTop: '15@vs',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textVer: {
    fontSize: '15@ms',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    color: 'black',
    marginEnd: '5@vs',
  },

  input: {
    marginHorizontal: '20@s',
    marginTop: '3@vs',
  },

  logo: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50@ms',
  },

  btnLogin: {
    marginHorizontal: '20@s',
    paddingVertical: '12@vs',
    backgroundColor: '#22abe1',
    marginTop: '15@vs',
    borderRadius: '5@vs',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  title: {
    fontWeight: 'bold',
    marginVertical: 4,
    color: 'white',
  },

  image: {
    width: '290@vs',
    height: '100@vs',
    marginBottom: '8@vs',
    resizeMode: 'contain',
  },
});
