import LottieView from 'lottie-react-native';
import React, {useContext, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonInterAndExter from '../../../components/ButtonInterAndExter';
import {AuthContext, AuthContextType} from '../../../context/AuthContext';
import {useDebounce} from '../../../utils/hooks/useDebounce';
import {useGetListLogistic} from '../../../utils/hooksv2/useGetListLogistic';
import {useGetListLogisticExternal} from '../../../utils/hooksv2/useGetListLogisticExternal';
import RenderToDetail from './RenderToDetail';

const steps = [
  {id: 1, name: 'Loading', value: 'uploading'},
  {id: 2, name: 'Driver', value: 'driver'},
  {id: 3, name: 'Supervisor', value: 'unloading'},
  {id: 4, name: 'Client', value: 'client'},
];

export interface optionProps {
  id: number;
  title: string;
  value: string;
  icon?: string;
}

export interface ProductNotSignDetailProps {
  activeButton: string;
}

const ProductNotSignDetail = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchQuery, 1000);
  const {selectedButtonProcess, setSelectedButtonProcess} = useContext(
    AuthContext,
  ) as AuthContextType;
  const {dataTotalListLogistic, isLoadingListLogistic} = useGetListLogistic(
    1,
    debouncedSearchValue,
    selectedButtonProcess,
  );
  const [currentStep, setCurrentStep] = useState(1); // Bước hiện tại
  const [activeButton, setActiveButton] = useState('internal');

  const {dataTotalListLogisticExternal, isLoadingListLogisticExternal} =
    useGetListLogisticExternal(1, debouncedSearchValue, 'ongoing');

  const handleChangeButton = (value: string) => {
    setActiveButton(value);

    if (value === 'internal') {
      setCurrentStep(Math.min(currentStep, 3)); // Quay về bước C nếu đang ở External
      setSelectedButtonProcess('unloading');
    } else if (value === 'external') {
      setCurrentStep(4); // Chuyển ngay tới bước D
    }
  };

  const handleStepPress = (stepId: number, value: string) => {
    if (stepId === 4) {
      setActiveButton('external'); // Kích hoạt External nếu bước D được chọn
    } else {
      setActiveButton('internal');
      // Kích hoạt Internal nếu các bước A, B, C được chọn
    }
    setSelectedButtonProcess(value);
    setCurrentStep(stepId);
  };

  // Tính tổng số trang
  const handleSearch = (value: string) => {
    setSearchQuery(value.toUpperCase());
  };

  const renderLoading = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <LottieView
        source={require('../../../assets/animations/Delta logo animation v3.json')} // Thay thế bằng đường dẫn đúng
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );

  const renderList = data => {
    if (!data?.founds || data.founds.length === 0) {
      return (
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Roboto-Regular', color: 'red'}}>
            {debouncedSearchValue === ''
              ? 'No product was found'
              : 'No result found'}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <FlatList
          data={data.founds}
          renderItem={({item}) => (
            <RenderToDetail item={item} activeButton={activeButton} />
          )}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          scrollEnabled={false} // Ngăn chặn FlatList cuộn
        />
      </ScrollView>
    );
  };

  const renderItem = () => {
    const isLoading =
      activeButton === 'external'
        ? isLoadingListLogisticExternal
        : isLoadingListLogistic;

    const data =
      activeButton === 'external'
        ? dataTotalListLogisticExternal
        : dataTotalListLogistic;

    return <View>{isLoading ? renderLoading() : renderList(data)}</View>;
  };

  return (
    <SafeAreaView style={{marginBottom: 110}}>
      {/* icon for process express delivery */}

      <ButtonInterAndExter setValue={handleChangeButton} />

      <View style={styles.container1}>
        {/* Thanh ngang và dấu chấm */}
        <View style={styles.progressBarContainer}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Dấu chấm */}
              <TouchableOpacity
                style={[
                  styles.step,
                  currentStep > step.id && styles.completedStep, // Đổi màu đen cho các bước trước đó
                  currentStep === step.id && styles.activeStep, // Đổi màu đen cho bước hiện tại
                ]}
                onPress={() => handleStepPress(step?.id, step?.value)} // Cập nhật bước hiện tại
              />

              {/* Thanh ngang (trừ bước cuối cùng) */}
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.progressSegment,
                    currentStep > index + 1 && styles.activeSegment, // Thanh ngang đổi màu đen
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Tên dưới dấu chấm */}
        <View style={styles.stepLabels}>
          {steps.map(step => (
            <Text
              key={step.id}
              style={[
                styles.stepLabel,
                currentStep >= step.id && styles.activeLabel, // Đổi màu đen cho chữ ở bước hiện tại và trước đó
              ]}>
              {step.name}
            </Text>
          ))}
        </View>
      </View>

      <TextInput
        placeholder="Search By Project Code"
        style={styles.searchBox}
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={query => handleSearch(query)}
      />

      {renderItem()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },

  button: {
    width: 150,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  selectedButton: {
    backgroundColor: '#22ABE0',
  },
  animation: {
    width: 150,
    height: 150,
  },

  // Thanh ngang và dấu chấm
  container1: {
    alignItems: 'center',
    padding: 20,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 20,
  },
  progressSegment: {
    height: 4,
    flex: 1,
    backgroundColor: 'black', // Màu mặc định (xanh)
  },
  activeSegment: {
    backgroundColor: '#27B770', // Thanh ngang đổi màu đen
  },
  step: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black', // Màu mặc định (xám)
    borderWidth: 2,
    borderColor: 'black',
  },
  completedStep: {
    backgroundColor: '#27B770', // Màu đen cho bước đã hoàn thành
    borderColor: '#27B770',
  },
  activeStep: {
    backgroundColor: '#27B770', // Màu đen cho bước hiện tại
    borderColor: '#27B770',
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  stepLabel: {
    fontSize: 14,
    color: 'black', // Màu mặc định (xám nhạt)
    textAlign: 'center',
  },
  activeLabel: {
    color: '#27B770', // Màu đen cho bước hiện tại và trước đó
  },
});

export default ProductNotSignDetail;
