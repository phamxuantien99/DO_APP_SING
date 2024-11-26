import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface RenderItemProps {
  item: any;
  activeButton: string;
}

const RenderToDetail: React.FC<RenderItemProps> = ({item, activeButton}) => {
  const navigation = useNavigation();
  const navigateToDetail = (productId: number) => {
    navigation.navigate('detailProduct', {productId, activeButton});
  };

  return (
    <TouchableOpacity onPress={() => navigateToDetail(item.invoice_id)}>
      <View style={styles.box}>
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
          <View style={styles.styleRowEach}>
            <Text style={styles.styleTextKey}>Project Code</Text>
            <Text style={styles.styleTextValue}>{item.project_code}</Text>
          </View>

          <View style={styles.styleRowEach}>
            <Text style={styles.styleTextKey}>Delivery Order Ref</Text>
            <Text style={styles.styleTextValue}>{item.delivery_order_ref}</Text>
          </View>

          <View style={styles.styleRowEach}>
            <Text style={styles.styleTextKey}>Location</Text>
            <Text style={styles.styleTextValue}>{item.location}</Text>
          </View>

          <View style={styles.styleRowEach}>
            <Text style={styles.styleTextKey}>Company</Text>
            <Text style={styles.styleTextValue}>{item.company}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 20,
  },

  dateHeader: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
    color: 'black',
  },
  dateGroup: {
    marginVertical: 10,
  },
  styleRowEach: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleTextKey: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 16,
    // maxWidth: 100,
    // minWidth: 80,
    textAlign: 'left',
  },
  styleTextValue: {
    flex: 1,
    // maxWidth: 100,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
    textDecorationColor: '#27B770',
    color: '#27B770',
    fontWeight: 'bold',
  },
});

export default RenderToDetail;
