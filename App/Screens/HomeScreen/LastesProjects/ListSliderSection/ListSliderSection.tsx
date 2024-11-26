import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
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
import LinearGradient from 'react-native-linear-gradient';
import {apiAxiosV2} from '../../../../api/api';
import {api} from '../../../../services/endpoint';
import ImageViewing from 'react-native-image-viewing';

export default function ListSliderSection() {
  const params = useRoute().params as {invoiceId: number};
  const {invoiceId} = params;

  const fetchDataDetail = async (invoiceId: number) => {
    try {
      return await apiAxiosV2
        .get(api.getListLogisticInternalIDV2(invoiceId))
        .then(res => res.data);
    } catch (error) {
      return {error: 'Failed to fetch data'};
    }
  };

  const {
    data: dataDetailID,
    refetch: refetchDataDetailID,
    isLoading: isLoadingDataDetailID,
  } = useQuery({
    queryKey: ['dataDetailProductInternalDelivered', invoiceId],
    queryFn: () => fetchDataDetail(invoiceId as number),
  });

  const [visibleSerialNo, setVisibleSerialNo] = React.useState<number | null>(
    null,
  ); // Lưu trữ serial_no của item đang hiển thị hình ảnh
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null); // Lưu trữ URL của ảnh đã chọn
  const handleImagePress = (imageUri: string, serialNo: number) => {
    setSelectedImage(imageUri);
    setVisibleSerialNo(serialNo);
  };

  if (isLoadingDataDetailID) {
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
            Detail Project: {dataDetailID?.project_code}
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
                {dataDetailID?.project_code}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Company</Text>
              <Text style={styles.styleTextValue}>{dataDetailID?.company}</Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Location</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailID?.location}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Delivery Order Ref</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailID?.delivery_order_ref}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Created At</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailID?.created_at}
              </Text>
            </View>

            <View style={styles.styleRowEach}>
              <Text style={styles.styleTextKey}>Client Ref</Text>
              <Text style={styles.styleTextValue}>
                {dataDetailID?.client_ref}
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
              <Text style={styles.styleTextValue}>{dataDetailID?.remark}</Text>
            </View>

            {/* Uploading */}
            {dataDetailID?.loading_by !== null && (
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
                    style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Roboto-Regular',
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Uploaded by Logistic Personnel
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                        textDecorationColor: '#27B770',
                        color: '#27B770',
                        fontWeight: 'bold',
                      }}>
                      {dataDetailID?.loading_by}
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
                    {dataDetailID?.loading_at}
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
                              dataDetailID?.loading_sign,
                              dataDetailID?.invoiceId,
                            )
                          }>
                          <FastImage
                            source={{
                              uri: `${dataDetailID?.loading_sign}`,
                              priority: FastImage.priority.normal,
                            }}
                            style={{width: 100, height: 80}}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </TouchableOpacity>
                        {selectedImage &&
                          visibleSerialNo === dataDetailID?.invoiceId && (
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
                              dataDetailID?.loading_img,
                              dataDetailID?.invoiceId,
                            )
                          }>
                          <FastImage
                            source={{
                              uri: `${dataDetailID?.loading_img}`,
                              priority: FastImage.priority.normal,
                            }}
                            style={{width: 95, height: 80}}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </TouchableOpacity>
                        {selectedImage &&
                          visibleSerialNo === dataDetailID?.invoiceId && (
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
            )}

            {/* Driver */}
            {dataDetailID?.driver_by !== null && (
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
                    style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <Text
                      style={{
                        maxWidth: 150,
                        textAlign: 'center',
                        fontFamily: 'Roboto-Regular',
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Uploaded by Driver
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                        textDecorationColor: '#27B770',
                        color: '#27B770',
                        fontWeight: 'bold',
                      }}>
                      {dataDetailID?.driver_by}
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
                    {dataDetailID?.driver_at}
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
                              dataDetailID?.driver_sign,
                              dataDetailID?.invoiceId,
                            )
                          }>
                          <FastImage
                            source={{
                              uri: `${dataDetailID?.driver_sign}`,
                              priority: FastImage.priority.normal,
                            }}
                            style={{width: 100, height: 80}}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </TouchableOpacity>
                        {selectedImage &&
                          visibleSerialNo === dataDetailID?.invoiceId && (
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
                              dataDetailID?.driver_img,
                              dataDetailID?.invoiceId,
                            )
                          }>
                          <FastImage
                            source={{
                              uri: `${dataDetailID?.driver_img}`,
                              priority: FastImage.priority.normal,
                            }}
                            style={{width: 95, height: 80}}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </TouchableOpacity>
                        {selectedImage &&
                          visibleSerialNo === dataDetailID?.invoiceId && (
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
            )}

            {/* Supervisor */}
            {dataDetailID?.unload_by !== null && (
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
                    style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <Text
                      style={{
                        maxWidth: 150,
                        textAlign: 'center',
                        fontFamily: 'Roboto-Regular',
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Uploaded by Driver
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                        textDecorationColor: '#27B770',
                        color: '#27B770',
                        fontWeight: 'bold',
                      }}>
                      {dataDetailID?.unload_by}
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
                    {dataDetailID?.unload_at}
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
                              dataDetailID?.unload_sign,
                              dataDetailID?.invoiceId,
                            )
                          }>
                          <FastImage
                            source={{
                              uri: `${dataDetailID?.unload_sign}`,
                              priority: FastImage.priority.normal,
                            }}
                            style={{width: 100, height: 80}}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </TouchableOpacity>
                        {selectedImage &&
                          visibleSerialNo === dataDetailID?.invoiceId && (
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
                              dataDetailID?.unload_img,
                              dataDetailID?.invoiceId,
                            )
                          }>
                          <FastImage
                            source={{
                              uri: `${dataDetailID?.unload_img}`,
                              priority: FastImage.priority.normal,
                            }}
                            style={{width: 95, height: 80}}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </TouchableOpacity>
                        {selectedImage &&
                          visibleSerialNo === dataDetailID?.invoiceId && (
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
            )}
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
