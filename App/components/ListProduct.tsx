import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {ListItem} from '../helper/types';
import {transformString} from '../utils/transformString';
import {
  componentsTitleMap,
  sortOrder,
} from '../Screens/HomeScreen/LastesProjects/LastestProjects';

const ListProduct: React.FC<{item: ListItem; activeButton: string}> = ({
  item,
  activeButton,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.box}>
      <View
        style={{
          backgroundColor: '#27B770',
          padding: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        {activeButton === 'internal' ? (
          <Text
            style={{
              fontFamily: 'Roboto',
              color: 'white',
              fontSize: 16,
            }}>
            {item?.components[0]?.component_by?.toUpperCase()} submitted -{' '}
            {item?.component_at}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: 'Roboto',
              color: 'white',
              fontSize: 16,
            }}>
            {item?.components[0]?.component_name?.toUpperCase()} submitted -{' '}
            {item?.component_at}
          </Text>
        )}
      </View>
      <View style={{backgroundColor: 'white', paddingHorizontal: 10}}>
        <View style={styles.styleRowEach}>
          <Text style={styles.styleTextKey}>Project Code</Text>
          <Text style={styles.styleTextValue}>{item?.project_code}</Text>
        </View>

        <View style={styles.styleRowEach}>
          <Text style={styles.styleTextKey}>Location</Text>
          <Text style={styles.styleTextValue}>{item?.location}</Text>
        </View>

        <View style={styles.styleRowEach}>
          <Text style={styles.styleTextKey}>DO reference</Text>
          <Text style={styles.styleTextValue}>{item?.delivery_order_ref}</Text>
        </View>

        <FlatList
          data={item?.components?.sort(
            (a, b) =>
              sortOrder.indexOf(a.component_name) -
              sortOrder.indexOf(b.component_name),
          )}
          keyExtractor={(component, index) =>
            `${component.component_name}-${index}`
          }
          renderItem={({item: component}) => (
            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>
                {componentsTitleMap[component.component_name] || 'Unknown'}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    backgroundColor: '#0D75BE',
                    padding: 7,
                    color: 'white',
                    borderRadius: 10,
                  }}>
                  Completed
                </Text>
                <Text
                  style={{
                    maxWidth: 70,
                    fontFamily: 'Roboto-Regular',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#27B770',
                    color: '#27B770',
                    fontWeight: 'bold',
                  }}>
                  {component.component_by}
                </Text>
              </View>
            </View>
          )}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
          }}>
          <IconEntypo name="dots-three-horizontal" size={20} color="#1c669e" />

          <TouchableOpacity
            onPress={() =>
              navigation.push(
                activeButton === 'internal'
                  ? 'slider-list'
                  : 'slider-list-external',

                {invoiceId: item.invoice_id},
              )
            }>
            <Text
              style={[
                styles.styleTextValue,
                {textDecorationLine: 'underline', color: '#1c669e'},
              ]}>
              See More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ListProduct;

const styles = StyleSheet.create({
  styleRowEach: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  styleTextKey: {
    // flex: 1,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 16,
    width: 150,
    textAlign: 'left',
  },
  styleTextValue: {
    // flex: 1,
    maxWidth: 160,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
    textDecorationColor: '#27B770',
    color: '#27B770',
    fontWeight: 'bold',
  },

  box: {
    marginRight: 20,
    marginVertical: 10,
    // padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
