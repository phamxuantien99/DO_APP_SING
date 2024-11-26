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
import FastImage from 'react-native-fast-image';
import ImageViewing from 'react-native-image-viewing';
import Heading from '../../../components/Heading';
import {useGetDataHomeExternalV2} from '../../../utils/hooksv2/useGetDataHomeExternalV2';

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

const HomeInternal: React.FC<HomeInternalProps> = ({debouncedSearchValue}) => {
  const navigation = useNavigation();

  const {dataHomeExternalV2, isLoadingHomeExternalV2} =
    useGetDataHomeExternalV2(1, debouncedSearchValue);

  const [visibleSerialNo, setVisibleSerialNo] = React.useState<number | null>(
    null,
  ); // Lưu trữ serial_no của item đang hiển thị hình ảnh
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null); // Lưu trữ URL của ảnh đã chọn

  const handleImagePress = (imageUri: string, serialNo: number) => {
    setSelectedImage(imageUri);
    setVisibleSerialNo(serialNo);
  };

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
            maxWidth: 300,
            fontSize: 16,
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
                {/* <Text
                  style={{
                    backgroundColor: '#0D75BE',
                    padding: 7,
                    color: 'white',
                    borderRadius: 10,
                  }}>
                  Completed
                </Text> */}
                <Text
                  style={{
                    maxWidth: 150,
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
            {selectedImage && visibleSerialNo === item.invoice_id && (
              <ImageViewing
                images={[{uri: selectedImage}]}
                imageIndex={0}
                visible={true}
                onRequestClose={() => setVisibleSerialNo(null)} // Đóng hình ảnh khi người dùng nhấn đóng
              />
            )}
          </View>
          <View style={{marginLeft: 20}}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('slider-list-external', {
                  invoiceId: item.invoice_id,
                })
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
      <Heading text="Lastest Delivery Order" seeAll="see-all-external" />
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
      dataHomeExternalV2?.list_component.length === 0 ? (
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
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dataHomeExternalV2?.list_component}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.invoice_id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default HomeInternal;
