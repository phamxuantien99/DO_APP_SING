import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Heading from '../../../components/Heading';
import {ListItem} from '../../../helper/types';
import {useGetDataHomeExternalV2} from '../../../utils/hooksv2/useGetDataHomeExternalV2';
import {formatDate} from '../../../helper/javascript';

export interface RootObject {
  list_component: Listcomponent[];
}

export interface Listcomponent {
  invoice_id: number;
  project_code: string;
  company: string;
  location: string;
  type_of_shutter: string;
  shutter_number: string;
  opening_width: string;
  opening_height: string;
  fab_list_no: string;
  finishing: string;
  serial_no: string;
  components: Itemcomponents[];
  component_at: string;
  delivery_order_ref: string;
  client_supporter: string;
}

export interface Itemcomponents {
  component_name: string;
  component_by: string;
  component_img: string;
}

export const componentsTitleMap = {
  loading: 'Logistic Personnel',
  driver: 'Driver',
  unload: 'Supervisor',
};

export const sortOrder = ['loading', 'driver', 'unload'];

interface HomeInternalProps {
  debouncedSearchValue: string;
}

const HomeExternal30: React.FC<HomeInternalProps> = ({
  debouncedSearchValue,
}) => {
  const navigation = useNavigation();

  const {dataHomeExternalV2, isLoadingHomeExternalV2} =
    useGetDataHomeExternalV2(90, debouncedSearchValue);

  const groupDate =
    isLoadingHomeExternalV2 === false &&
    dataHomeExternalV2?.list_component?.reduce(
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

  const renderItem1: ListRenderItem<Listcomponent> = ({item}) => (
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
            maxWidth: 360,
          }}>
          {item?.client_supporter} submitted - {item?.component_at}
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
                    maxWidth: 160,
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
                'slider-list-external',

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
    <View style={{marginBottom: 100}}>
      <Heading
        text="Delivered In the Past 3 month"
        seeAll="see-all-external30"
      />
      {isLoadingHomeExternalV2 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <LottieView
            source={require('../../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
            autoPlay
            loop={true}
            style={styles.animation}
          />
        </View>
      )}

      {isLoadingHomeExternalV2 === false &&
      Object.keys(groupDate)?.length === 0 ? (
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              color: 'red',
            }}>
            {debouncedSearchValue === ''
              ? 'No delivery was done'
              : 'No result found'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(groupDate)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{formatDate(item)}</Text>
              <FlatList
                data={Object.values(groupDate[item])}
                horizontal
                keyExtractor={(item, index) => item.invoice_id}
                renderItem={renderItem1}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

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
    marginRight: 20,
    marginVertical: 10,
    // padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default HomeExternal30;
