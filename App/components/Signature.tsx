import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import {AuthContext, AuthContextType} from '../context/AuthContext';

function Signature() {
  const route = useRoute();
  const ref = useRef();
  const navigation = useNavigation();
  const {setImgSignature, setImageKey} = useContext(
    AuthContext,
  ) as AuthContextType;
  const {name} = route.params as {
    name: string;
  };

  const handleEnd = () => {
    ref?.current?.readSignature();
  };

  // const clearSignature = async () => {
  //   const path = `${RNFS.DocumentDirectoryPath}/signature.png`;
  //   if (await RNFS.exists(path)) {
  //     await RNFS.unlink(path); // Xóa file chữ ký cũ
  //   }
  // };

  const readSignature = async (signature: string) => {
    const base64Code = signature.split('data:image/png;base64,')[1];
    setImgSignature(base64Code);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleData = data => {
    // console.log(data);e
  };

  const submitButton = async () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        height: '70%',
        gap: 4,
        paddingHorizontal: 4,
        paddingTop: 2,
      }}>
      <View style={styles.signature}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            padding: 4,
            fontFamily: 'Fredoka-Medium',
          }}>
          Signature below for:
          <Text style={{color: '#0D75BE', fontFamily: 'Fredoka-Medium'}}>
            {' '}
            {name}
          </Text>
        </Text>
        <SignatureScreen
          ref={instance => (ref.current = instance!)}
          scrollable={false}
          onEnd={handleEnd}
          onOK={readSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          backgroundColor="white"
          dotSize={0}
          webviewContainerStyle={{borderRadius: 20, padding: 0, margin: 0}}
          androidHardwareAccelerationDisabled={true}
          webStyle={`
           .m-signature-pad--footer {
             display: none;
           }

           .m-signature-pad {
             box-shadow: none;
             border: none;
           }

           .m-signature-pad--body canvas {
             top: 0!important;
             bottom: 0!important;
           }

           .m-signature-pad--body {
             height: calc(100% + 32px);
           }
         `}
        />
      </View>
      <View
        style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <Text
          style={{
            backgroundColor: '#0D75BE',
            flex: 1,
            textAlign: 'center',
            color: 'white',
            fontSize: 16,
            width: '100%',
            paddingVertical: 15,
            borderRadius: 30,
            fontFamily: 'Roboto-Regular',
          }}
          onPress={() => {
            ref.current?.clearSignature();
          }}>
          Cancel
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: 'white',
            width: '100%',
            backgroundColor: '#27B770',
            paddingVertical: 15,
            borderRadius: 30,
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
          }}
          onPress={() => submitButton()}>
          Submit
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  signature: {
    flex: 3,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    maxWidth: 90,
  },
  paginationButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Signature;
