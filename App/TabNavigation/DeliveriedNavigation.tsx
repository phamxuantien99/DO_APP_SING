import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import DetailProjectDone from '../Screens/ProjectDone/DetailProjectDone/DetailProjectDone';
import DetailPrọectDoneInternal from '../Screens/ProjectDone/DetailProjectDoneInternal/DetailPrọectDoneInternal';
import ProjectDone from '../Screens/ProjectDone/ProjectDone';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {AuthContext, AuthContextType} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function DeliveriedNavigation({navigation}: {navigation: any}) {
  const routes = useNavigationState(state => state.routes);
  const isOnHomeMain = routes.some(route => route.name === 'delivered');
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
            name: 'delivered',
          }),
        );
      }
    });
    return unsubscribe;
  }, [navigation, isOnHomeMain]);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="delivered">
      <Stack.Screen name="delivered" component={ProjectDone} />
      <Stack.Screen name="DetailProjectDone" component={DetailProjectDone} />
      <Stack.Screen
        name="DetailProjectDoneInternal"
        component={DetailPrọectDoneInternal}
      />
    </Stack.Navigator>
  );
}
