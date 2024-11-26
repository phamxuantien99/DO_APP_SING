import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeadingAccount from './HeadingAccount';
import {AuthContext} from '../../context/AuthContext';

export default function AccountScreen() {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  return (
    <View>
      <ScrollView>
        <HeadingAccount text="Profile" />
        {/* <Header /> */}
        <View style={{paddingTop: 40}}>
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#D1D5DB',
              elevation: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('change-password')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',

                paddingVertical: 20,

                paddingHorizontal: 25,
                justifyContent: 'space-between',
                alignContent: 'center',
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderBottomColor: '#D1D5DB',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <IconMaterialCommunityIcons
                  name={'lock-reset'}
                  size={30}
                  color="#502385"
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'capitalize',
                    fontFamily: 'Roboto-Light',
                    color: 'black',
                  }}>
                  change password
                </Text>
              </View>
              <IconFontAwesome name={'angle-right'} size={30} color="#502385" />
            </TouchableOpacity>
            {/* About app */}
            <TouchableOpacity
              onPress={() => navigation.navigate('about-app')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 25,
                justifyContent: 'space-between',
                alignContent: 'center',
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderBottomColor: '#D1D5DB',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <IconMaterialCommunityIcons
                  name={'tablet-android'}
                  size={30}
                  color="#502385"
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'capitalize',
                    fontFamily: 'Roboto-Light',
                    color: 'black',
                  }}>
                  about app
                </Text>
              </View>
              <IconFontAwesome name={'angle-right'} size={30} color="#502385" />
            </TouchableOpacity>

            {/* Log out */}
            <TouchableOpacity
              onPress={() => logout()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 25,
                justifyContent: 'space-between',
                alignContent: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <IconMaterialCommunityIcons
                  name={'logout'}
                  size={30}
                  color="#502385"
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'capitalize',
                    fontFamily: 'Roboto-Light',
                    color: 'black',
                  }}>
                  logout
                </Text>
              </View>
              <IconFontAwesome name={'angle-right'} size={30} color="#502385" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
