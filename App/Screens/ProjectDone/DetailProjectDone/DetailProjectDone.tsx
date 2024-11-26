import {useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewing from 'react-native-image-viewing';
import {useGetDataDetailExternal} from '../../../utils/hooksv2/useGetDataDetailExternal';
import LinearGradient from 'react-native-linear-gradient';

interface PropsDetail {
  project_code: string;
  company: string;
  location: string;
  type_of_shutter: string;
  shutter_number: string;
  opening_width: string;
  opening_height: string;
  serial_no: string;
  fab_list_no: string;
  finishing: string;
  shutterhood_assembly: string;
  shutterhood_assembly_by: string;
  shutterhood_assembly_img: string;
  slat_and_bottom_bar: string;
  slat_and_bottom_bar_by: string;
  slat_and_bottom_bar_img: string;
  side_guide: string;
  side_guide_by: string;
  side_guide_img: string;
  cover: string;
  cover_by: string;
  cover_img: string;
  cabling: string;
  cabling_by: string;
  cabling_img: string;
  motor: string;
  motor_by: string;
  motor_img: string;
  operation: string;
  operation_by: string;
  operation_img: string;
  t_and_c: string;
  t_and_c_by: string;
}

export default function DetailProjectDone() {
  const params = useRoute().params as {invoiceId: number};
  const {invoiceId} = params;

  const {isLoadingDetailExternal, dataDetailExternal} =
    useGetDataDetailExternal(invoiceId);

  const [visibleSerialNo, setVisibleSerialNo] = React.useState<number | null>(
    null,
  ); // Lưu trữ serial_no của item đang hiển thị hình ảnh
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null); // Lưu trữ URL của ảnh đã chọn
  const handleImagePress = (imageUri: string, serialNo: number) => {
    setSelectedImage(imageUri);
    setVisibleSerialNo(serialNo);
  };

  if (isLoadingDetailExternal) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
          autoPlay
          loop={true}
          style={styles.animation}
        />
      </View>
    );
  }

  return (
    <View style={{padding: 10, paddingTop: 30, marginBottom: 100}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/OnlyLogo.png')}
            style={{width: 50, height: 50}}
          />

          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            {/* Detail SerialNo : {serialNo} */}
            Detail Project: {dataDetailExternal?.project_code}
          </Text>
        </View>
        <View style={styles.box}>
          <LinearGradient
            colors={['#03adfc', '#03fc6f']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              padding: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 15,
              }}>
              The delivery order have been completed
            </Text>
          </LinearGradient>
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Project Code</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.project_code}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Company</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.company}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Location</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.location}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Delivery Order Ref</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.delivery_order_ref}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Created At</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.created_at}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Client Ref</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.client_ref}
              </Text>
            </View>

            <View
              style={[
                styles.styleRowEach,
                {
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderBottomColor: 'black',
                },
              ]}>
              <Text style={styles.styleTextKey}>Remark</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailExternal?.remark}
              </Text>
            </View>

            {/* Client */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                borderBottomColor: 'black',
                borderStyle: 'solid',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  paddingVertical: 15,
                  flex: 0.65,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  borderRightWidth: 1,
                  borderStyle: 'solid',
                  borderRightColor: 'black',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingRight: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    color: 'black',
                    fontSize: 15,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}>
                  Updated:
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}>
                  <Text
                    style={{
                      maxWidth: 150,
                      textAlign: 'center',
                      fontFamily: 'Roboto-Regular',
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Customer
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      textDecorationColor: '#27B770',
                      color: '#27B770',
                      fontWeight: 'bold',
                    }}>
                    {dataDetailExternal?.name}
                  </Text>
                </View>
              </View>
              {/* Right Column */}
              <View style={{flex: 1, paddingVertical: 15}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#27B770',
                    color: '#27B770',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {dataDetailExternal?.client_at}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: 10,
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Regular',
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Signature
                    </Text>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          handleImagePress(
                            dataDetailExternal?.client_img,
                            dataDetailExternal?.invoiceId,
                          )
                        }>
                        <FastImage
                          source={{
                            uri: `${dataDetailExternal?.client_img}`,
                            priority: FastImage.priority.normal,
                          }}
                          style={{width: 95, height: 80}}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                      {selectedImage &&
                        visibleSerialNo === dataDetailExternal?.invoiceId && (
                          <ImageViewing
                            images={[{uri: selectedImage}]}
                            imageIndex={0}
                            visible={true}
                            onRequestClose={() => setVisibleSerialNo(null)} // Đóng hình ảnh khi người dùng nhấn đóng
                          />
                        )}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Regular',
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Picture
                    </Text>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          handleImagePress(
                            dataDetailExternal?.client_sign,
                            dataDetailExternal?.invoiceId,
                          )
                        }>
                        <FastImage
                          source={{
                            uri: `${dataDetailExternal?.client_sign}`,
                            priority: FastImage.priority.normal,
                          }}
                          style={{width: 100, height: 80}}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                      {selectedImage &&
                        visibleSerialNo === dataDetailExternal?.invoiceId && (
                          <ImageViewing
                            images={[{uri: selectedImage}]}
                            imageIndex={0}
                            visible={true}
                            onRequestClose={() => setVisibleSerialNo(null)} // Đóng hình ảnh khi người dùng nhấn đóng
                          />
                        )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Info client */}
            <View style={{padding: 13}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 30,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}>
                  Date:
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#27B770',
                    color: '#27B770',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {dataDetailExternal?.client_at}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 24,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}>
                  Email:
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#27B770',
                    color: '#27B770',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {dataDetailExternal?.email}
                </Text>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', gap: 18}}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}>
                  Phone:
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#27B770',
                    color: '#27B770',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {dataDetailExternal?.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 250,
    height: 250,
  },
  styleRowEach: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  styleTextKey: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  styleTextValue: {
    flex: 1,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#27B770',
    color: '#27B770',
    fontWeight: 'bold',
  },
  box: {
    // marginRight: 20,
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  Image: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: 'black',
  },
  InstallBy: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: 'black',
  },
  shutterHood: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: 'black',
  },

  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  TextInstallBy: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});
