import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useContext, useMemo} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Heading from '../../../components/Heading';
import {AuthContext, AuthContextType} from '../../../context/AuthContext';
import {componentOrder, ListItem} from '../../../helper/types';
import {useGetDataHomeInternalV2} from '../../../utils/hooksv2/useGetDataHomeInternalV2';
import {
  componentsTitleMap,
  Listcomponent,
  sortOrder,
} from '../../HomeScreen/LastesProjects/LastestProjects';

// import Clipboard from '@react-native-community/clipboard';

interface Component {
  component_name: string;
  component_img: string;
  component_by: string;
}

interface Section {
  component_date: string;
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
  components: Component[];
}

interface MyWorkDone30Props {
  debouncedSearchValue: string;
}

const MyWorkDone30: React.FC<MyWorkDone30Props> = ({debouncedSearchValue}) => {
  const {dataHomeInternalV2, isLoadingHomeInternalV2} =
    useGetDataHomeInternalV2(90, debouncedSearchValue, '');

  const navigation = useNavigation();
  const {userInfo} = useContext(AuthContext) as AuthContextType;

  const groupDate = useMemo(() => {
    if (isLoadingHomeInternalV2 === false && dataHomeInternalV2 && userInfo) {
      return dataHomeInternalV2.list_component.reduce(
        (acc: Record<string, ListItem[]>, item: ListItem) => {
          const matchedComponents = item.components.filter(
            (component: Component) => {
              return component.component_by === userInfo?.user_info?.user_name;
            },
          );
          if (matchedComponents.length > 0) {
            const newItem: ListItem = {
              invoice_id: item.invoice_id,
              delivery_order_ref: item.delivery_order_ref,
              created_at: item.created_at,
              project_code: item.project_code,
              company: item.company,
              location: item.location,
              contact_person: item.contact_person,
              contact_number: item.contact_number,
              driver: item.driver,
              client_ref: item.client_ref,
              remark: item.remark,
              component_at: item.component_at,
              components: matchedComponents.sort((a, b) => {
                return (
                  componentOrder.indexOf(a.component_name) -
                  componentOrder.indexOf(b.component_name)
                );
              }),
            };
            const date = newItem.component_at;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(newItem);
          }
          return acc;
        },
        {},
      );
    } else {
      return {};
    }
  }, [isLoadingHomeInternalV2, dataHomeInternalV2, userInfo]);

  const ComponentItem: ListRenderItem<Listcomponent> = ({item}) => (
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
                'DetailProjectDoneInternal',

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

  const handleCopyAll = (sections: Section[]) => {
    let copyText = 'đasad';

    //   const componentsText = item.components
    //     .map(component => {
    //       const naText =
    //         (component.component_name === 'motor' ||
    //           component.component_name === 'cabling') &&
    //         component.component_img === 'N'
    //           ? ' - N/A'
    //           : '';
    //       return `Component Name: ${transformString(
    //         component.component_name,
    //       )}${naText}, Component By: ${component.component_by}`;
    //     })
    //     .join('\n');

    //   copyText += `Component Date: ${item.component_date}\nProject Code: ${item.project_code}\nCompany: ${item.company}\nLocation: ${item.location}\nType of Shutter: ${item.type_of_shutter}\nShutter Number: ${item.shutter_number}\nOpening Width: ${item.opening_width}\nOpening Height: ${item.opening_height}\nFab List No: ${item.fab_list_no}\nFinishing: ${item.finishing}\nSerial No: ${item.serial_no}\n${componentsText}\n\n`;
    // });

    Clipboard.setString(copyText);
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <View style={{marginBottom: 100}}>
      <Heading text="Delivered In the Past 3 month" />

      {isLoadingHomeInternalV2 && (
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

      {isLoadingHomeInternalV2 === false &&
      Object.keys(groupDate).length === 0 ? (
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Roboto-Regular', color: 'red'}}>
            {debouncedSearchValue === ''
              ? 'No delivery was done'
              : 'No result found'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(groupDate)}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({item}) => (
            <View style={styles.dateGroup}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.dateHeader}>{item}</Text>
                <TouchableOpacity>
                  <Text>
                    {/* <IoniconsCopy
                      name="copy-outline"
                      size={20}
                      color="black"
                      onPress={() => handleCopyAll(groupDate[item])}
                    /> */}
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={Object.values(groupDate[item])}
                horizontal
                keyExtractor={(item, index) =>
                  item.invoice_id + index.toString()
                }
                renderItem={({item}: {item: ListItem}) => (
                  <ComponentItem item={item} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyWorkDone30;
const styles = StyleSheet.create({
  dateHeader: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
    color: 'black',
  },
  dateGroup: {
    marginVertical: 10,
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
