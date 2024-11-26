import React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  secureTextEntry: boolean;
  showPass: boolean;
  onChangeShowPassword: (event: GestureResponderEvent) => void;
}

const TextInputComponent: React.FC<Props> = ({
  label,
  value,
  placeholder,
  onChange,
  showPass,
  onChangeShowPassword,
}) => {
  return (
    <View>
      <PaperTextInput
        mode={'outlined'}
        style={styles.input}
        label={label}
        value={value}
        placeholderTextColor={'#00000040'}
        onChangeText={onChange}
        secureTextEntry={showPass}
        placeholder={placeholder}
        right={
          <PaperTextInput.Icon onPress={onChangeShowPassword} icon={'eye'} />
        }
      />
    </View>
  );
};

export default TextInputComponent;

const styles = ScaledSheet.create({
  input: {
    marginHorizontal: '20@s',
    marginTop: '3@vs',
  },

  btnLogin: {
    marginHorizontal: '20@s',
    paddingVertical: '12@vs',
    backgroundColor: '#22abe1',
    marginTop: '15@vs',
    borderRadius: '5@vs',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  title: {
    fontFamily: 'Roboto-Regular',
    marginVertical: 4,
    color: 'white',
  },
});
