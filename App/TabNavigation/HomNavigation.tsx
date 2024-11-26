import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import SeeAllBusiness from '../Screens/HomeScreen/BusinessList/SeeAllBusiness/SeeAllBusiness';
import SeeAllHomeExternal from '../Screens/HomeScreen/HomeExternal/SeeAllHomeExternal/SeeAllHomeExternal';
import SeeAllExternal30 from '../Screens/HomeScreen/HomeExternal30/SeeAllExternal30/SeeAllExternal30';
import SeeAllHomeInternal30 from '../Screens/HomeScreen/HomeInternal30/SeeAllHomeInternal30/SeeAllHomeInternal30';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ListSliderSection from '../Screens/HomeScreen/LastesProjects/ListSliderSection/ListSliderSection';
import ListSliderSectionExternal from '../Screens/HomeScreen/LastesProjects/ListSliderSectionExternal/ListSliderSectionExternal';
import SeeAllSlide from '../Screens/HomeScreen/LastesProjects/SeeAllSlide/SeeAllSlide';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import {AuthContext, AuthContextType} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function HomNavigation({navigation}: {navigation: any}) {
  const {setImagePicture, setImgSignature, setInfoClient} = useContext(
    AuthContext,
  ) as AuthContextType;
  const routes = useNavigationState(state => state.routes);
  const isOnHomeMain = routes.some(route => route.name === 'home');

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
            name: 'home',
          }),
        );
      }
    });
    return unsubscribe;
  }, [navigation, isOnHomeMain]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="slider-list" component={ListSliderSection} />
      <Stack.Screen
        name="slider-list-external"
        component={ListSliderSectionExternal}
      />
      <Stack.Screen name="see-all-slider-list" component={SeeAllSlide} />
      <Stack.Screen
        name="see-all-internal30"
        component={SeeAllHomeInternal30}
      />
      <Stack.Screen name="see-all-external30" component={SeeAllExternal30} />
      <Stack.Screen name="see-all-external" component={SeeAllHomeExternal} />
      <Stack.Screen name="see-all-business-list" component={SeeAllBusiness} />
    </Stack.Navigator>
  );
}
