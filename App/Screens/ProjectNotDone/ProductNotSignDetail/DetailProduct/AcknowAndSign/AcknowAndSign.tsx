import {useNavigation} from '@react-navigation/native';
import React, {useContext, useRef} from 'react';
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'; // Import đúng từ thư viện
import {AuthContext, AuthContextType} from '../../../../../context/AuthContext';
import ImageViewing from 'react-native-image-viewing';
import IconCameraFeather from 'react-native-vector-icons/Feather';

interface Props {
  dataDetail: any;
  activeButton: string;
  handleFiledChange: (filedName: string, text: string) => void;
  isLoading: boolean;

  // dataDetailExternal: any;
  infoClient: infoClient;
}

interface infoClient {
  name: string;
  email: string;
  phone_number: string;
}

const AcknowAndSign: React.FC<Props> = ({
  dataDetail,
  activeButton,
  handleFiledChange,
  // dataDetailExternal,
  infoClient,
  isLoading,
}) => {
  const {selectedButtonProcess, imgSignature, imagePicture, setImagePicture} =
    useContext(AuthContext) as AuthContextType;
  const navigation = useNavigation();
  const actionSheetRef = useRef();
  const [isVisible, setIsVisble] = React.useState(false);
  const [selectImg, setSelectImg] = React.useState('');

  const handleSelectImg = (img: string) => {
    setSelectImg(img);
    setIsVisble(true);
  };

  const handleCloseSelectImg = () => {
    setSelectImg('');
    setIsVisble(false);
  };

  const handleToNavigateToSignature = (params: {[key: string]: any}) => {
    navigation.navigate('signature', params);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
          includeBase64: true,
          saveToPhotos: false,
          quality: 1,
        });
        const uriImage = result.assets[0].uri;

        setImagePicture(uriImage || '');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Hàm yêu cầu quyền truy cập vào thư viện ảnh

  const requestGalleryPermission = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // Đảm bảo bạn nhận được base64
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uriImage = response.assets[0].uri;

        setImagePicture(uriImage || '');
      }
    });
  };

  const showActionSheet = () => {
    if (actionSheetRef.current) actionSheetRef.current.show();
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0) {
      requestCameraPermission();
    } else if (index === 1) {
      requestGalleryPermission();
    }
  };

  return (
    <View style={{marginTop: 10}}>
      <View
        style={{
          backgroundColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'black'}}>
          Acknowlegdement
        </Text>
      </View>

      {/* Signature */}
      <View>
        {/* Uploading */}
        {(selectedButtonProcess === 'uploading' ||
          selectedButtonProcess === 'driver' ||
          selectedButtonProcess === 'unloading') &&
          activeButton === 'internal' && (
            <View
              style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderBottomColor: '#D1D5DB',
                paddingVertical: 20,
              }}>
              {/* Header for Unloader */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginHorizontal: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    flex: 1,
                  }}>
                  Logsitic Personnel Signature
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    flex: 0.8,
                    textAlign: 'center',
                  }}>
                  Loaded Material Photo
                </Text>
              </View>
              {/* Body for Unloader */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 30,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginHorizontal: 15,
                  paddingTop: 20,
                }}>
                {dataDetail?.loading_by ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleSelectImg(dataDetail?.loading_sign)}>
                      <FastImage
                        source={{
                          uri: `${dataDetail?.loading_sign}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={{width: 100, height: 90}}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <ImageViewing
                      images={[{uri: selectImg}]}
                      imageIndex={0}
                      visible={isVisible}
                      onRequestClose={handleCloseSelectImg}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      handleToNavigateToSignature({
                        name: 'Logistic Personnel Signature',
                      })
                    }>
                    {imgSignature ? (
                      <FastImage
                        style={{width: 100, height: 90}}
                        source={{
                          uri: `data:image/png;base64,${imgSignature}`,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    ) : (
                      <Text
                        style={{
                          maxWidth: 128,
                          color: 'white',
                          // fontSize: 12,
                          borderBottomWidth: 1,
                          borderStyle: 'solid',
                          borderBottomColor: '#6B7280',
                          textAlign: 'center',
                          padding: 7,
                          backgroundColor: '#0D75BE',
                          fontFamily: 'Roboto-Regular',
                        }}>
                        Click to Sign
                      </Text>
                    )}
                  </TouchableOpacity>
                )}

                {dataDetail?.loading_img ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleSelectImg(dataDetail?.loading_img)}>
                      <FastImage
                        source={{
                          uri: `${dataDetail?.loading_img}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={{width: 90, height: 90}}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </TouchableOpacity>
                    <ImageViewing
                      images={[{uri: selectImg}]}
                      imageIndex={0}
                      visible={isVisible}
                      onRequestClose={() => setIsVisble(false)}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={showActionSheet}>
                    {imagePicture ? (
                      <FastImage
                        style={{width: 90, height: 90}}
                        source={{
                          uri: `file://${imagePicture}`,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : (
                      <IconCameraFeather
                        name="camera"
                        size={40}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

        {/* driver */}
        {(selectedButtonProcess === 'driver' ||
          selectedButtonProcess === 'unloading') &&
          activeButton === 'internal' && (
            <View
              style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderBottomColor: '#D1D5DB',
                paddingVertical: 20,
              }}>
              {/* Header for driver */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Driver Signature
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Material on lorry Photo
                </Text>
              </View>
              {/* Body for driver */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 30,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginHorizontal: 15,
                  paddingTop: 20,
                  // paddingRight: '4%',
                }}>
                {dataDetail?.driver_by ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleSelectImg(dataDetail?.driver_sign)}>
                      <FastImage
                        source={{
                          uri: `${dataDetail?.driver_sign}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={{width: 100, height: 90}}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <ImageViewing
                      images={[{uri: selectImg}]}
                      imageIndex={0}
                      visible={isVisible}
                      onRequestClose={handleCloseSelectImg}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      handleToNavigateToSignature({
                        name: 'Driver Signature',
                      })
                    }>
                    {imgSignature ? (
                      <FastImage
                        style={{width: 100, height: 90}}
                        source={{
                          uri: `data:image/png;base64,${imgSignature}`,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    ) : (
                      <Text
                        style={{
                          maxWidth: 128,
                          color: 'white',
                          // fontSize: 12,
                          borderBottomWidth: 1,
                          borderStyle: 'solid',
                          borderBottomColor: '#6B7280',
                          textAlign: 'center',
                          padding: 7,
                          backgroundColor: '#0D75BE',
                        }}>
                        Click to Sign
                      </Text>
                    )}
                  </TouchableOpacity>
                )}

                {dataDetail?.driver_img ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleSelectImg(dataDetail?.driver_img)}>
                      <FastImage
                        source={{
                          uri: `${dataDetail?.driver_img}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={{width: 90, height: 90}}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </TouchableOpacity>
                    <ImageViewing
                      images={[{uri: selectImg}]}
                      imageIndex={0}
                      visible={isVisible}
                      onRequestClose={() => setIsVisble(false)}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={showActionSheet}>
                    {imagePicture ? (
                      <FastImage
                        style={{width: 90, height: 90}}
                        source={{
                          uri: `file://${imagePicture}`,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : (
                      <IconCameraFeather
                        name="camera"
                        size={40}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

        {/* supervisor */}
        {selectedButtonProcess === 'unloading' &&
          activeButton === 'internal' && (
            <View
              style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderBottomColor: '#D1D5DB',
                paddingVertical: 20,
              }}>
              {/* Header for Unloader */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Supervisor Signature
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Unloaded Photo
                </Text>
              </View>
              {/* Body for Unloader */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 30,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginHorizontal: 15,
                  paddingTop: 20,
                  // paddingRight: '4%',
                }}>
                {dataDetail?.unload_by ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleSelectImg(dataDetail?.unload_sign)}>
                      <FastImage
                        source={{
                          uri: `${dataDetail?.unload_sign}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={{width: 100, height: 90}}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <ImageViewing
                      images={[{uri: selectImg}]}
                      imageIndex={0}
                      visible={isVisible}
                      onRequestClose={handleCloseSelectImg}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      handleToNavigateToSignature({
                        name: 'Supervisor Signature',
                      })
                    }>
                    {imgSignature ? (
                      <FastImage
                        style={{width: 100, height: 90}}
                        source={{
                          uri: `data:image/png;base64,${imgSignature}`,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    ) : (
                      <Text
                        style={{
                          maxWidth: 128,
                          color: 'white',
                          // fontSize: 12,
                          borderBottomWidth: 1,
                          borderStyle: 'solid',
                          borderBottomColor: '#6B7280',
                          textAlign: 'center',
                          padding: 7,
                          backgroundColor: '#0D75BE',
                        }}>
                        Click to Sign
                      </Text>
                    )}
                  </TouchableOpacity>
                )}

                {dataDetail?.unload_img ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleSelectImg(dataDetail?.unload_img)}>
                      <FastImage
                        source={{
                          uri: `${dataDetail?.unload_img}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={{width: 90, height: 90}}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </TouchableOpacity>
                    <ImageViewing
                      images={[{uri: selectImg}]}
                      imageIndex={0}
                      visible={isVisible}
                      onRequestClose={() => setIsVisble(false)}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={showActionSheet}>
                    {imagePicture ? (
                      <FastImage
                        style={{width: 90, height: 90}}
                        source={{
                          uri: `file://${imagePicture}`,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : (
                      <IconCameraFeather
                        name="camera"
                        size={40}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

        {/* Client */}
        {activeButton === 'external' && (
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderBottomColor: '#D1D5DB',
              paddingVertical: 20,
            }}>
            {/* Header for Client */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 12,
                  flex: 1,
                  textAlign: 'center',
                }}>
                Client Signature
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 12,
                  flex: 1,
                  textAlign: 'center',
                }}>
                Material On site Photo
              </Text>
            </View>
            {/* Body for Client */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 40,
                justifyContent: 'space-around',
                alignItems: 'center',
                marginHorizontal: 15,
                paddingTop: 20,
                paddingRight: '3%',
              }}>
              <TouchableOpacity
                onPress={() =>
                  handleToNavigateToSignature({
                    name: 'Supervisor Signature',
                  })
                }>
                {imgSignature ? (
                  <FastImage
                    style={{width: 100, height: 90}}
                    source={{
                      uri: `data:image/png;base64,${imgSignature}`,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : (
                  <Text
                    style={{
                      maxWidth: 128,
                      color: 'white',
                      borderBottomWidth: 1,
                      borderStyle: 'solid',
                      borderBottomColor: '#6B7280',
                      textAlign: 'center',
                      padding: 7,
                      backgroundColor: '#0D75BE',
                    }}>
                    Click to Sign
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={showActionSheet}>
                {imagePicture ? (
                  <FastImage
                    style={{width: 90, height: 90}}
                    source={{
                      uri: `file://${imagePicture}`,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <IconCameraFeather name="camera" size={40} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info client */}
        {activeButton === 'external' && (
          <View>
            {/* Name */}
            <View
              style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                paddingBottom: 8,
                paddingTop: 8,
                borderBottomColor: '#D1D5DB',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    paddingLeft: 20,
                    flex: 0.3,
                  }}>
                  Name:
                </Text>
                <TextInput
                  placeholder="Enter the value"
                  style={[styles.textInput, {flex: 1}]}
                  value={infoClient?.name}
                  onChangeText={(text: string) => {
                    handleFiledChange('name', text);
                  }}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Contact */}

            <View
              style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                paddingBottom: 8,
                paddingTop: 8,
                borderBottomColor: '#D1D5DB',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    paddingLeft: 20,
                    flex: 0.3,
                  }}>
                  Contact:
                </Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Enter the value"
                  style={[styles.textInput, {flex: 1}]}
                  value={infoClient?.phone_number}
                  onChangeText={(text: string) => {
                    handleFiledChange('phone_number', text);
                  }}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Email */}

            <View
              style={{
                borderBottomWidth: 1,
                borderStyle: 'solid',
                paddingBottom: 8,
                paddingTop: 8,
                borderBottomColor: '#D1D5DB',
                marginBottom: 8,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 12,
                    paddingLeft: 20,
                    flex: 0.3,
                  }}>
                  Email:
                </Text>
                <TextInput
                  placeholder="Enter the value"
                  style={[styles.textInput, {flex: 1}]}
                  value={infoClient?.email}
                  onChangeText={(text: string) => {
                    handleFiledChange('email', text);
                  }}
                  editable={!isLoading}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <ActionSheet
        ref={actionSheetRef}
        title={'Select Image Source'}
        options={['Take Photo', 'Choose from Gallery', 'Cancel']}
        cancelButtonIndex={2}
        onPress={handleActionSheetPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    flex: 1,
    fontSize: 11,
  },
});

export default AcknowAndSign;
