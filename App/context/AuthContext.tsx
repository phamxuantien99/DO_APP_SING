import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {createContext, useState, ReactNode} from 'react';
import {Alert} from 'react-native';
import {apiAxiosV1} from '../api/api';

// Define interfaces for your data types
export interface InfoContactObject {
  email: string;
  phone_number: string;
  name: string;
}

interface RootObject {
  access_token: string;
  expiration: string;
  refresh_token: string;
  expiration_refresh_token: string;
  user_info: Userinfo;
}

interface Userinfo {
  user_name: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  id: number;
  created_at: string;
  updated_at: string;
}

// Define the type for the AuthContext
export interface AuthContextType {
  isLoading: boolean;
  userInfo: RootObject | {};
  isLogedin: boolean;
  imagePicture: string;
  imgSignature: string | undefined;
  infoClient: InfoContactObject;
  showSuccess: boolean;
  login: (email: string, password: string, saveUser: boolean) => Promise<void>;
  logout: () => Promise<void>;
  setUserInfo: React.Dispatch<React.SetStateAction<RootObject | {}>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setImgSignature: React.Dispatch<React.SetStateAction<string>>;
  setImagePicture: React.Dispatch<React.SetStateAction<string>>;
  setInfoClient: React.Dispatch<React.SetStateAction<InfoContactObject>>;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;

  selectedButtonProcess: string;
  setSelectedButtonProcess: (value: string) => void;
}

// Create context with the defined type
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// AuthProvider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [userInfo, setUserInfo] = useState<RootObject | {}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [infoClient, setInfoClient] = useState({
    name: '',
    email: '',
    phone_number: '',
  });
  const [isLogedin, setIsLoggedIn] = useState<boolean>(false);
  const [imgSignature, setImgSignature] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [imagePicture, setImagePicture] = useState<string>('');

  const navigation = useNavigation();

  const [selectedButtonProcess, setSelectedButtonProcess] =
    useState<string>('uploading');

  // Login function
  const login = async (email: string, password: string, saveUser: boolean) => {
    setIsLoading(true);
    try {
      const response = await apiAxiosV1.post(`/auth/sign-in`, {
        user_name: email,
        password: password,
      });
      const userInfo = response.data;

      setUserInfo(userInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      await AsyncStorage.setItem('nameUserInfo', userInfo.user_info.user_name);
      if (saveUser) {
        await AsyncStorage.setItem('accessToken', userInfo.access_token);
        await AsyncStorage.setItem('refreshToken', userInfo.refresh_token);
        await AsyncStorage.setItem('expiration', userInfo.expiration);
        await AsyncStorage.setItem(
          'expiration_refresh_token',
          userInfo.expiration_refresh_token,
        );
        await AsyncStorage.setItem('remember', 'true');
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.setItem('accessToken', userInfo.access_token);
        await AsyncStorage.setItem('expiration', userInfo.expiration);
        await AsyncStorage.setItem('remember', 'false');
        await AsyncStorage.setItem('password', password);
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    } catch (error) {
      console.log(`Login error ${error}`);
      Alert.alert('Username/Password is wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('expiration');
      await AsyncStorage.removeItem('expiration_refresh_token');
      await AsyncStorage.removeItem('remember');
      await AsyncStorage.removeItem('password');
      setUserInfo({});

      // Reset navigation
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error) {
      console.log(`Logout error ${error}`);
      Alert.alert('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setUserInfo,
        userInfo,
        isLogedin,
        setIsLoggedIn,
        login,
        logout,
        setImgSignature,
        imgSignature,
        setInfoClient,
        infoClient,
        setShowSuccess,
        showSuccess,
        selectedButtonProcess,
        setSelectedButtonProcess,

        imagePicture,
        setImagePicture,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
