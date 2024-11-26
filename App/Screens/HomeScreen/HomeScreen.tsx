import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonInterAndExter from '../../components/ButtonInterAndExter';
import HeaderPage from '../../components/HeaderPage';
import {useDebounce} from '../../utils/hooks/useDebounce';
import HomeExternal from './HomeExternal/HomeExternal';
import HomeExternal30 from './HomeExternal30/HomeExternal30';
import HomeInternal from './HomeInternal/HomeInternal';
import HomeInternal30 from './HomeInternal30/HomeInternal30';

export default function HomeScreen() {
  const [activeButton, setActiveButton] = useState('internal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchQuery, 1000);

  const handleChangeButton = (value: string) => {
    setActiveButton(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <HeaderPage />
          <View style={{paddingTop: 20, paddingHorizontal: 20}}>
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
            {activeButton === 'internal' ? (
              <View style={{paddingTop: 20}}>
                <HomeInternal debouncedSearchValue={debouncedSearchValue} />
                <HomeInternal30 debouncedSearchValue={debouncedSearchValue} />
              </View>
            ) : (
              <View style={{paddingTop: 20}}>
                <HomeExternal debouncedSearchValue={debouncedSearchValue} />
                <HomeExternal30 debouncedSearchValue={debouncedSearchValue} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
});
