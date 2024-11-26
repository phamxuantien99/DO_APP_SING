import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import ProductNotSignDetail from './ProductNotSignDetail/ProductNotSignDetail';

export default function ProductNotSign() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{paddingTop: 20, paddingHorizontal: 20}}>
            <ProductNotSignDetail />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
