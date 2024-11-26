import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const InfoDelivery = ({dataDetail}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#E5E7EB',
          marginTop: 8,
          marginBottom: 8,
          paddingBottom: 8,
          paddingTop: 8,
        }}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'black'}}>
          Project Delivery Order (PDO)
        </Text>
      </View>

      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Customer
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.company}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Date
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.created_at}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Location
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.location}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Delivery Order Ref
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.delivery_order_ref}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Contact Person
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.contact_person}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Project Ref No
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.project_code}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Contact No
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.contact_number}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem', // 6 * 0.25rem = 1.5rem
            alignItems: 'center',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: 'gray',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', minWidth: 150}}>
            Client Ref
          </Text>
          <Text style={{fontSize: 13}}>{dataDetail?.client_ref}</Text>
        </View>
      </View>

      {/* row 3 */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            // maxWidth: 40,
            flex: 0.5,
            textAlign: 'center',
          }}>
          Type Of Shutter
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            flex: 0.6,
          }}>
          Shutter No.
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
            // paddingRight: 36,
            flex: 1.4,
          }}>
          Description
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            // maxWidth: 50,
            flex: 0.6,
          }}>
          Opening Width
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            // maxWidth: 50,
            flex: 0.6,
          }}>
          Opening Height
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            flex: 0.6,
          }}>
          Serial No.
        </Text>
      </View>

      {/* value */}
      {dataDetail?.data &&
        dataDetail?.data.map((item: any, index: number) => {
          return (
            <View
              style={
                item?.delivery_no === dataDetail?.delivery_order_ref && {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderBottomColor: '#6B7280',
                  paddingTop: 4,
                  paddingBottom: 4,
                }
              }
              key={index}>
              {item?.delivery_no === dataDetail?.delivery_order_ref && (
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: 'bold',

                    flex: 0.3,
                    textAlign: 'center',
                  }}>
                  {item.type_of_shutter}
                </Text>
              )}
              {item?.delivery_no === dataDetail?.delivery_order_ref && (
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: 'bold',
                    paddingLeft: 12,

                    flex: 0.3,
                    textAlign: 'center',
                  }}>
                  {item.shutter_number}
                </Text>
              )}

              {item?.delivery_no === dataDetail?.delivery_order_ref && (
                <View
                  style={{
                    marginLeft: 20,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: 'bold',

                      textAlign: 'left',
                    }}>
                    {item.description}
                  </Text>
                  <Text style={{fontSize: 9, fontWeight: 'bold'}}>
                    Sub components:
                  </Text>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    {item?.total_sub_components.map(
                      (item: string, index: number) => {
                        return (
                          <Text
                            key={index}
                            style={{fontSize: 9, textAlign: 'left'}}>
                            - {item}
                          </Text>
                        );
                      },
                    )}
                  </View>
                </View>
              )}

              {item?.delivery_no === dataDetail?.delivery_order_ref && (
                <View style={styles.containerProperty}>
                  <Text style={styles.text1}>{item?.opening_width}</Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: 'bold',
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    {item?.opening_height}
                  </Text>
                  <Text style={styles.text}>{item?.serial_no}</Text>
                </View>
              )}
            </View>
          );
        })}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 4,
        }}>
        Remark: {dataDetail?.remark}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerProperty: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    flex: 1.2,
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  text1: {
    fontSize: 9,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
  },
});

export default InfoDelivery;
