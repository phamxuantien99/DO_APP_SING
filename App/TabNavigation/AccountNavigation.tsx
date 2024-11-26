import {CommonActions, useNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import AboutApp from '../Screens/AccountScreen/AboutApp/AboutApp';
import AccountScreen from '../Screens/AccountScreen/AccountScreen';
import ChangePassword from '../Screens/AccountScreen/ChangePassword/ChangePassword';
import {AuthContext, AuthContextType} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AccountNavigation({navigation}: {navigation: any}) {
  const {setImagePicture, setImgSignature, setInfoClient} = useContext(
    AuthContext,
  ) as AuthContextType;
  const routes = useNavigationState(state => state.routes);
  const isOnHomeMain = routes.some(route => route.name === 'account');

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      // Chỉ reset stack khi không ở màn hình chính HomeMain
      if (!isOnHomeMain) {
        // Reset trạng thái trước khi điều hướng để tránh lag
        setImgSignature('');
        setImagePicture('');
        setInfoClient({
          name: '',
          email: '',
          phone_number: '',
        });
        // Ngăn hành động mặc định
        // e.preventDefault();
        navigation.dispatch(
          CommonActions.navigate({
            name: 'account',
          }),
        );
      }
    });
    return unsubscribe;
  }, [navigation, isOnHomeMain]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="account">
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="change-password" component={ChangePassword} />
      <Stack.Screen name="about-app" component={AboutApp} />
    </Stack.Navigator>
  );
}
