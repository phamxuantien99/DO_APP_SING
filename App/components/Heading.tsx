import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface HeadingProps {
  text: string;
  seeAll?: string;
}

const Heading: React.FC<HeadingProps> = ({text, seeAll}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>{text}</Text>
      </View>
      {seeAll && (
        <TouchableOpacity
          onPress={() => navigation.navigate(seeAll)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 6,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '700',
              textTransform: 'capitalize',
              fontSize: 16,
            }}>
            See all
          </Text>
          <Icon name="angle-right" size={18} color={'gray'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    color: '#03adfc',
    fontWeight: '600',
    fontFamily: 'Fredoka-Medium',
    textTransform: 'capitalize',
  },
});
export default Heading;
