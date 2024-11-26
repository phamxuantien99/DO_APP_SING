import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useGetDataHomeInternalV2} from '../../../../utils/hooksv2/useGetDataHomeInternalV2';
// import {Listcomponent} from '../LastestProjects';
import {
  componentsTitleMap,
  Listcomponent,
  sortOrder,
} from '../../HomeInternal/HomeInternal';
import {ListItem} from '../../../../helper/types';
import {formatDate} from '../../../../helper/javascript';

export default function SeeAllHomeInternal30() {
  const navigation = useNavigation();

  const {dataHomeInternalV2, isLoadingHomeInternalV2} =
    useGetDataHomeInternalV2(90, '');

  const groupDate =
    isLoadingHomeInternalV2 === false &&
    dataHomeInternalV2?.list_component?.reduce(
      (acc: Record<string, ListItem[]>, item: ListItem) => {
        const date = item.component_at;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      },
      {},
    );

  const renderItem: ListRenderItem<Listcomponent> = ({item}) => (
    <View style={styles.box}>
      <View
        style={{
          backgroundColor: '#27B770',
          padding: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            color: 'white',
            fontSize: 16,
          }}>
          {item?.components[0]?.component_by?.toUpperCase()} submitted -{' '}
          {item?.component_at}
        </Text>
      </View>
      <View style={{backgroundColor: 'white'}}>
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
                {componentsTitleMap[component.component_name] || 'Customer'}
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
                'slider-list',

                {
                  invoiceId: item.invoice_id,
                },
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

  return (
    <View style={{marginBottom: 150, marginTop: 20, paddingHorizontal: 20}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../../../assets/images/OnlyLogo.png')}
          style={{width: 50, height: 50}}
        />
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Roboto-Regular',
            color: '#03adfc',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: '#03adfc',
          }}>
          See All Delivery Order
        </Text>
      </View>
      {isLoadingHomeInternalV2 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <LottieView
            source={require('../../../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
            autoPlay
            loop={true}
            style={styles.animation}
          />
        </View>
      )}
      {isLoadingHomeInternalV2 === false &&
      dataHomeInternalV2?.list_component.length === 0 ? (
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Roboto-Regular', color: 'red'}}>
            No project is finished today.
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(groupDate)}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{formatDate(item)}</Text>
              <FlatList
                data={Object.values(groupDate[item])}
                horizontal={false}
                keyExtractor={(item, index) =>
                  item.components[0].component_img + index.toString()
                }
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    marginVertical: 10,
  },
  dateHeader: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
    color: 'black',
  },
  animation: {
    width: 150,
    height: 150,
  },
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
    // marginRight: 20,
    marginVertical: 10,
    // padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
