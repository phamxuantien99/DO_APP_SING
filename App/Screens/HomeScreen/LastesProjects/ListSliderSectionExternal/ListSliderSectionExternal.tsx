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
import LinearGradient from 'react-native-linear-gradient';
import {useGetDataDetailExternal} from '../../../../utils/hooksv2/useGetDataDetailExternal';

export default function ListSliderSectionExternal() {
  const params = useRoute().params as {invoiceId: number};
  const {invoiceId} = params;

  const {dataDetailExternal, isLoadingDetailExternal} =
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
          source={require('../../../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
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
            source={require('../../../../assets/images/OnlyLogo.png')}
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
                fontSize: 16,
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

            <View
              style={{
                paddingHorizontal: 5,
                paddingTop: 10,
                marginLeft: 10,
                paddingBottom: 10,
              }}>
              {/* Img */}
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    paddingTop: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      color: 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      flex: 0.6,
                    }}>
                    Customer
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      color: 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      flex: 0.7,
                    }}>
                    Signature
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      color: 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      flex: 0.7,
                    }}>
                    Picture
                  </Text>
                </View>
                {/* body */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    paddingTop: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      textDecorationColor: '#27B770',
                      color: '#27B770',
                      fontWeight: 'bold',
                      flex: 0.6,
                    }}>
                    {dataDetailExternal?.name.toUpperCase()}
                  </Text>
                  <View style={{alignItems: 'center', flex: 0.7}}>
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
                  <View style={{alignItems: 'center', flex: 0.7}}>
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
    fontSize: 16,
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
