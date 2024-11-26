import LottieView from 'lottie-react-native';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import ListProduct from '../../../../components/ListProduct';
import {ListItem} from '../../../../helper/types';
import {useGetDataHomeInternalV2} from '../../../../utils/hooksv2/useGetDataHomeInternalV2';

export default function SeeAllBusiness() {
  const {dataHomeInternalV2, isLoadingHomeInternalV2} =
    useGetDataHomeInternalV2(30, '');

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

  return (
    <View style={{marginTop: 20, marginBottom: 170, paddingHorizontal: 20}}>
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
            textTransform: 'capitalize',
          }}>
          Install in the past a month
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
            No project is finished a month
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(groupDate)}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{item}</Text>
              <FlatList
                data={Object.values(groupDate[item])}
                horizontal={false}
                keyExtractor={(item, index) =>
                  item.components[0].component_img + index.toString()
                }
                renderItem={({item}: {item: ListItem}) => (
                  <ListProduct item={item} />
                )}
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
  animation: {
    width: 150,
    height: 150,
  },
  dateGroup: {
    marginVertical: 10,
  },
  dateHeader: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
    color: 'black',
  },
  itemContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },

  styleRowEach: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleTextKey: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 16,
    maxWidth: 100,
    minWidth: 80,
    textAlign: 'center',
  },
  styleTextValue: {
    flex: 1,
    maxWidth: 100,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
    textDecorationColor: '#27B770',
    color: '#27B770',
    fontWeight: 'bold',
  },
  box: {
    marginVertical: 10,
    borderRadius: 10,
  },
});
