import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import apiAxios from '../../../api/api';
import HeadingAccount from '../HeadingAccount';
import TextInputComponent from './TextInput';
import showToast from '../../../helper/toastHelper';
import {api} from '../../../services/endpoint';

const getPassword = async () => {
  try {
    const passowrd = await AsyncStorage.getItem('password');
    if (passowrd !== null) {
      return passowrd;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch the password from storage', error);
    return null;
  }
};

export default function ChangePassword() {
  const [showPass, setShowPass] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  const [listPassword, setListPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Text for password
  const handleChangeText = (name: string, value: string) => {
    setListPassword({
      ...listPassword,
      [name]: value,
    });
  };

  // Show password
  const handleShowPassword = (name: string) => {
    setShowPass({
      ...showPass,
      [name as keyof typeof showPass]: !showPass[name as keyof typeof showPass],
    });
  };

  const handleSubmitChangePassord = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const storedPassword = await getPassword();
      if (
        storedPassword === listPassword.oldPassword &&
        listPassword.newPassword === listPassword.confirmPassword &&
        listPassword.newPassword !== '' &&
        listPassword.confirmPassword !== ''
      ) {
        const response = await apiAxios.put(api.putChangePassword, {
          old_password: storedPassword,
          new_password: listPassword.newPassword,
        });

        showToast(
          'success',
          'Success!',
          'Your password has been changed successfully!',
        );

        setListPassword({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        await AsyncStorage.setItem('password', listPassword.newPassword);

        return response.data;
      } else if (storedPassword !== listPassword.oldPassword) {
        showToast(
          'error',
          'Something went wrong!',
          'The current password is incorrect!',
        );
      } else if (
        listPassword.newPassword !== listPassword.confirmPassword ||
        listPassword.newPassword === '' ||
        listPassword.confirmPassword === ''
      ) {
        showToast(
          'error',
          'Something went wrong!',
          'The new password and confirm password do not match!',
        );
      }
    } catch (error) {
      console.error('Failed to fetch the password from storage', error);
      throw error;
    }
  };

  return (
    <ScrollView
      style={{marginBottom: 140}}
      showsVerticalScrollIndicator={false}>
      <HeadingAccount text="Change Password" />
      <Toast />
      <View
        style={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
        <TextInputComponent
          label={'Old Password'}
          value={listPassword.oldPassword}
          onChange={(text: string) => handleChangeText('oldPassword', text)}
          showPass={showPass.oldPassword}
          onChangeShowPassword={() => handleShowPassword('oldPassword')}
          placeholder={'Enter Old Password'}
          secureTextEntry={showPass.oldPassword}
        />

        <TextInputComponent
          label={'New Password'}
          value={listPassword.newPassword}
          onChange={(text: string) => handleChangeText('newPassword', text)}
          showPass={showPass.newPassword}
          onChangeShowPassword={() => handleShowPassword('newPassword')}
          placeholder={'Enter New Password'}
          secureTextEntry={showPass.newPassword}
        />

        <TextInputComponent
          label={'Confirm Password'}
          value={listPassword.confirmPassword}
          onChange={(text: string) => handleChangeText('confirmPassword', text)}
          showPass={showPass.confirmPassword}
          onChangeShowPassword={() => handleShowPassword('confirmPassword')}
          placeholder={'Enter New Password'}
          secureTextEntry={showPass.confirmPassword}
        />

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={event => handleSubmitChangePassord(event as any)}>
          <Text style={styles.title}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  input: {
    marginHorizontal: '20@s',
    marginTop: '3@vs',
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
    fontFamily: 'Roboto-Regular',
    marginVertical: 4,
    color: 'white',
  },
});
