import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import ProjectNotDone from '../Screens/ProjectNotDone/ProjectNotDone';
import DetailProduct from '../Screens/ProjectNotDone/ProductNotSignDetail/DetailProduct/DetailProduct';
import Signature from '../components/Signature';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {AuthContext, AuthContextType} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function OnGoingNavigation({navigation}: {navigation: any}) {
  const routes = useNavigationState(state => state.routes);
  const isOnHomeMain = routes.some(route => route.name === 'ongoing');
  const {setImagePicture, setImgSignature, setInfoClient} = useContext(
    AuthContext,
  ) as AuthContextType;

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
            name: 'ongoing',
          }),
        );
      }
    });
    return unsubscribe;
  }, [navigation, isOnHomeMain]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ongoing">
      <Stack.Screen name="ongoing" component={ProjectNotDone} />
      <Stack.Screen name="detailProduct" component={DetailProduct} />
      <Stack.Screen name="signature" component={Signature} />
    </Stack.Navigator>
  );
}
