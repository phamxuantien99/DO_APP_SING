import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string, type: string) => {
  try {
    await AsyncStorage.setItem(type, token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

export const getToken = async (type: string) => {
  try {
    return await AsyncStorage.getItem(type);
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};

export const removeToken = async (type: string) => {
  try {
    await AsyncStorage.removeItem(type);
  } catch (error) {
    console.error('Error removing token', error);
  }
};
