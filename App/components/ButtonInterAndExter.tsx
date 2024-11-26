import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

interface Props {
  setValue: (value: string) => void;
}

const ButtonInterAndExter: React.FC<Props> = ({setValue}) => {
  const [activeButton, setActiveButton] = useState('internal');

  const handleChangeButton = (value: string) => {
    setActiveButton(value);
    setValue(value);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 9,
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity
        style={[
          styles.buttonNoActive,
          activeButton === 'internal' && styles.buttonActiveInternal,
        ]}
        onPress={() => handleChangeButton('internal')}>
        <Text
          style={[
            styles.textNo1Active,
            activeButton === 'internal' && styles.textActive,
          ]}>
          Internal
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.buttonNoActive,
          activeButton === 'external' && styles.buttonActiveExternal,
        ]}
        onPress={() => handleChangeButton('external')}>
        <Text
          style={[
            styles.textNoActive,
            activeButton === 'external' && styles.textActive,
          ]}>
          External
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNoActive: {
    flex: 1,
    padding: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  buttonActiveInternal: {
    flex: 1,
    backgroundColor: '#10B981',
  },

  buttonActiveExternal: {
    flex: 1,
    backgroundColor: '#0D75BE',
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
});

export default ButtonInterAndExter;
