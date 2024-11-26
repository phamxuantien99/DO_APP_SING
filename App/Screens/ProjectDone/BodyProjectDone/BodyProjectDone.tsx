import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Pagination from '../../../components/Pagination';
import {useDebounce} from '../../../utils/hooks/useDebounce';

import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ButtonInterAndExter from '../../../components/ButtonInterAndExter';
import {useGetListLogistic} from '../../../utils/hooksv2/useGetListLogistic';
import {useGetListLogisticExternal} from '../../../utils/hooksv2/useGetListLogisticExternal';

// Define TypeScript types for data

interface FoundItem {
  invoice_id: number;
  delivery_order_ref: string;
  created_at: string;
  project_code: string;
  company: string;
  location: string;
  contact_person: string;
  contact_number: string;
  driver: string;
  client_ref: string;
  remark: string;
  name: string;
  email: string;
  phone: string;
  client_sign: string;
  client_img: string;
  client_at: string;
  unload_sign: string;
  unload_img: string;
  unload_at: string;
  unload_by: string;
  send: string;
}

interface Section {
  date: string;
  data: FoundItem[];
}

// Function to group data by 'client_at'
const groupByClientAt = (data: FoundItem[]): Record<string, FoundItem[]> => {
  return data.reduce((groups, item) => {
    const date = item.client_at || item.unload_at;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, FoundItem[]>);
};

const ITEMS_PER_PAGE = 20;

export default function BodyProjectDone() {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('internal');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchQuery, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {dataTotalListLogisticExternal, isLoadingListLogisticExternal} =
    useGetListLogisticExternal(currentPage, debouncedSearchValue, 'delivered');

  const {dataTotalListLogistic, isLoadingListLogistic} = useGetListLogistic(
    currentPage,
    debouncedSearchValue,
    'delivered',
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleChangeButton = (value: string) => {
    setActiveButton(value);
  };

  // Decide which data to use based on activeButton
  const isExternal = activeButton === 'external';
  const searchOptions = isExternal
    ? dataTotalListLogisticExternal?.search_options
    : dataTotalListLogistic?.search_options;

  const totalCount = searchOptions?.total_count ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Group data by 'client_at'
  const groupedData = useMemo(() => {
    const founds = isExternal
      ? dataTotalListLogisticExternal?.founds
      : dataTotalListLogistic?.founds;
    if (!founds || founds.length === 0) return null;
    return groupByClientAt(founds);
  }, [
    dataTotalListLogisticExternal?.founds,
    dataTotalListLogistic?.founds,
    isExternal,
  ]);

  const sections = useMemo<Section[]>(
    () =>
      groupedData
        ? Object.keys(groupedData).map(date => ({
            date,
            data: groupedData[date],
          }))
        : [], // Return empty array if groupedData is undefined
    [groupedData],
  );

  const renderItem: ListRenderItem<FoundItem> = useCallback(
    ({item}) => (
      <View style={styles.box}>
        <View
          style={{
            backgroundColor: '#27B770',
            padding: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          {activeButton === 'internal' ? (
            <Text
              style={{
                fontFamily: 'Roboto',
                color: 'white',
                fontSize: 16,
              }}>
              {item?.unload_by?.toUpperCase()} - {item?.unload_at}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'Roboto',
                color: 'white',
                fontSize: 16,
                maxWidth: 250,
              }}>
              {item?.name?.toUpperCase()} - {item.client_at}
            </Text>
          )}
        </View>
        <View style={{backgroundColor: 'white'}}>
          <View style={{paddingBottom: 10}}>
            {/* Project Code */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingTop: 5,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 16,
                  maxWidth: 150,
                  minWidth: 100,
                  fontFamily: 'Roboto',
                }}>
                Project Code:
              </Text>
              <Text
                style={{
                  maxWidth: 200,
                  fontFamily: 'Roboto',
                  color: 'black',
                  fontSize: 16,
                }}>
                {item.project_code}
              </Text>
            </View>

            {/* Location */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingTop: 5,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 16,
                  maxWidth: 150,
                  minWidth: 100,
                  fontFamily: 'Roboto',
                }}>
                Location:
              </Text>
              <Text
                style={{
                  maxWidth: 200,
                  fontFamily: 'Roboto',
                  color: 'black',
                  fontSize: 16,
                }}>
                {item.location}
              </Text>
            </View>

            {/* DO Ref */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingTop: 5,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 16,
                  maxWidth: 150,
                  minWidth: 100,
                  fontFamily: 'Roboto',
                }}>
                DO Ref:
              </Text>
              <Text
                style={{
                  maxWidth: 200,
                  fontFamily: 'Roboto',
                  color: 'black',
                  fontSize: 16,
                }}>
                {item.delivery_order_ref}
              </Text>
            </View>

            {/* Comany */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingTop: 5,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 16,
                  maxWidth: 150,
                  minWidth: 100,
                  fontFamily: 'Roboto',
                }}>
                Company:
              </Text>
              <Text
                style={{
                  maxWidth: 200,
                  fontFamily: 'Roboto',
                  color: 'black',
                  fontSize: 16,
                }}>
                {item.company}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
            }}>
            <IconEntypo
              name="dots-three-horizontal"
              size={20}
              color="#637aff"
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  activeButton === 'internal'
                    ? 'DetailProjectDoneInternal'
                    : 'DetailProjectDone',
                  {
                    invoiceId: item.invoice_id,
                  },
                )
              }>
              <Text
                style={[
                  styles.styleTextValue,
                  {textDecorationLine: 'underline', color: '#637aff'},
                ]}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [activeButton],
  );

  // Callback for rendering each section
  const renderSection = useCallback(
    (section: Section) => (
      <View key={section.date} style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>{section.date}</Text>
        <FlatList
          data={section.data}
          keyExtractor={item => item.invoice_id.toString()}
          horizontal={true}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    ),
    [renderItem],
  );

  return (
    <View style={{marginBottom: 120}}>
      <ButtonInterAndExter setValue={handleChangeButton} />

      <TextInput
        placeholder="Search By Project Code"
        style={styles.searchBox}
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={query => handleSearch(query)}
      />

      {/* Loading Animation */}
      {(isExternal ? isLoadingListLogisticExternal : isLoadingListLogistic) && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <LottieView
            source={require('../../../assets/animations/Delta logo animation v3.json')}
            autoPlay
            loop
            style={{width: 150, height: 150}}
          />
        </View>
      )}

      {/* Data Display */}
      {isLoadingListLogisticExternal === false &&
      (!groupedData ||
        groupedData === undefined ||
        Object.keys(groupedData).length === 0) &&
      debouncedSearchValue ? (
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Roboto-Regular', color: 'red'}}>
            No Project is finished yet
          </Text>
        </View>
      ) : (
        <View>{sections.map(renderSection)}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    alignItems: 'stretch', // Make sure the boxes stretch to equal height
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateGroup: {
    marginVertical: 10,
  },
  dateHeader: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
    color: 'black',
  },
  itemContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },

  styleRowEach: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 10,

    textAlign: 'left',
  },
  styleTextKey: {
    fontFamily: 'Roboto-Regular',
    color: 'black',

    maxWidth: 120,
    minWidth: 80,
    textAlign: 'center',
  },
  styleTextValue: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
    textDecorationColor: '#637aff',
    color: '#637aff',
    maxWidth: 150,
    fontWeight: 'bold',
  },
  box: {
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 10,
    flex: 1,
  },

  buttonNoActive: {
    flex: 1,
    padding: 2,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  buttonActive: {
    flex: 1,
    backgroundColor: '#10B981',
  },

  textNo1Active: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },

  textActive: {
    color: 'white',
  },

  textNoActive: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },

  containerSelect: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },

  selectedButton: {
    backgroundColor: '#22ABE0',
  },

  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
  },

  // example
});
