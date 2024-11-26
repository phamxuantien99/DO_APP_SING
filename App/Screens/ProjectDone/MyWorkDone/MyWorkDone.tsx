import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useContext, useMemo} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewing from 'react-native-image-viewing';
import Heading from '../../../components/Heading';
import {AuthContext, AuthContextType} from '../../../context/AuthContext';
import {Component, ListItem} from '../../../helper/types';
import {useGetDataHomeInternalV2} from '../../../utils/hooksv2/useGetDataHomeInternalV2';
import {
  componentsTitleMap,
  Listcomponent,
  sortOrder,
} from '../../HomeScreen/LastesProjects/LastestProjects';

const componentOrder = ['loading', 'driver', 'unload'];

interface WorkDoneInternalProps {
  debouncedSearchValue: string;
}

const MyWorkDone: React.FC<WorkDoneInternalProps> = ({
  debouncedSearchValue,
}) => {
  const {dataHomeInternalV2, isLoadingHomeInternalV2} =
    useGetDataHomeInternalV2(1, debouncedSearchValue, '');
  const navigation = useNavigation();
  const {userInfo} = useContext(AuthContext) as AuthContextType;

  const [visibleInvoiceId, setVisibleInvoiceId] = React.useState<number | null>(
    null,
  ); // Lưu trữ serial_no của item đang hiển thị hình ảnh
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null); // Lưu trữ URL của ảnh đã chọn

  const handleImagePress = (imageUri: string, serialNo: number) => {
    setSelectedImage(imageUri);
    setVisibleInvoiceId(serialNo);
  };

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

        <View style={styles.styleRowEach}>
          <View style={{width: 150}}>
            <TouchableOpacity
              onPress={() =>
                handleImagePress(
                  item?.components[0]?.component_img,
                  item.invoice_id,
                )
              }>
              <FastImage
                source={{
                  uri: `${item?.components[0]?.component_img}`,
                  priority: FastImage.priority.normal,
                }}
                style={{width: 90, height: 90}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            {selectedImage && visibleInvoiceId === item.invoice_id && (
              <ImageViewing
                images={[{uri: selectedImage}]}
                imageIndex={0}
                visible={true}
                onRequestClose={() => setVisibleInvoiceId(null)} // Đóng hình ảnh khi người dùng nhấn đóng
              />
            )}
          </View>
          <View style={{marginLeft: 20}}>
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
                  {
                    textDecorationLine: 'underline',
                    color: '#1c669e',
                  },
                ]}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <Heading text="Lastest Delivery Order" />

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
              ? 'No delivery was done today'
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
                <TouchableOpacity
                //   onPress={() => handleCopyAll(groupDate[item])}
                >
                  <Text>
                    {/* <IoniconsCopy name="copy-outline" size={20} color="black" /> */}
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

export default MyWorkDone;

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
