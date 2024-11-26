import {View, Text, ScrollView, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderPage from '../../components/HeaderPage';
import BodyProjectDone from './BodyProjectDone/BodyProjectDone';
import MyWorkDone from './MyWorkDone/MyWorkDone';
import MyWorkDone30 from './MyWorkDone30/MyWorkDone30';
import {useDebounce} from '../../utils/hooks/useDebounce';
import ButtonInterAndExter from '../../components/ButtonInterAndExter';
import MyWorkDoneExternal from './MyWorkDoneExternal/MyWorkDoneExternal';
import MyWorkDoneExternal30 from './MyWorkDoneExternal30/MyWorkDoneExternal30';

export default function HomeScreen() {
  const [activeButton, setActiveButton] = useState('internal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchQuery, 1000);

  const handleChangeButton = (value: string) => {
    setActiveButton(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value.toUpperCase());
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
                <MyWorkDone debouncedSearchValue={debouncedSearchValue} />
                <MyWorkDone30 debouncedSearchValue={debouncedSearchValue} />
              </View>
            ) : (
              <View style={{paddingTop: 20}}>
                <MyWorkDoneExternal
                  debouncedSearchValue={debouncedSearchValue}
                />
                <MyWorkDoneExternal30
                  debouncedSearchValue={debouncedSearchValue}
                />
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
