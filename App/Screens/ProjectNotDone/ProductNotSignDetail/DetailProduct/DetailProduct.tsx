import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {apiAxiosV2} from '../../../../api/api';
import {AuthContext, AuthContextType} from '../../../../context/AuthContext';
import {api} from '../../../../services/endpoint';
import {base64Image} from '../../../../utils/baseCode64';
import AcknowAndSign from './AcknowAndSign/AcknowAndSign';
import InfoDelivery from './InfoDelivery/InfoDelivery';
import Spinner from 'react-native-loading-spinner-overlay';

const header = [
  'No.',
  'type_of_shutter',
  'Shutter No.',
  'Description',
  'opening_width',
  'opening_height',
  'serial_no',
];

const header1 = [
  'No.',
  'Type Of Shutter',
  'Shutter No.',
  'Description',
  'Opening width',
  'opening height',
  'Serial No.',
];

export default function DetailProduct() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const route = useRoute();
  const {productId, activeButton} = route.params as {
    productId: number;
    activeButton: string;
  };

  // const [infoClient, setInfoClient] = useState({
  //   name: '',
  //   email: '',
  //   phone_number: '',
  // });

  const handleFiledChange = (filedName: string, text: string) => {
    setInfoClient(
      (prevData: {name: string; email: string; phone_number: string}) => ({
        ...prevData,
        [filedName]: text,
      }),
    );
  };
  const navigation = useNavigation();
  const {
    selectedButtonProcess,
    imagePicture,
    imgSignature,
    setImagePicture,
    setImgSignature,
    setInfoClient,
    infoClient,
    userInfo,
  } = React.useContext(AuthContext) as AuthContextType;

  const fetchDataDetail = async (productId: number) => {
    try {
      return await apiAxiosV2
        .get(api.getListLogisticInternalIDV2(productId))
        .then(res => res.data);
    } catch (error) {
      console.log('error dataDetailProductInternal', error);
      return {error: 'Failed to fetch data'};
    }
  };

  const {
    data: dataDetailID,
    refetch: refetchDataDetailID,
    isLoading: isLoadingDataDetailID,
  } = useQuery({
    queryKey: ['dataDetailProduct', productId],
    queryFn: () => fetchDataDetail(productId as number),
  });

  if (dataDetailID === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <LottieView
          source={require('../../../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
          autoPlay
          loop={true}
          style={styles.animation}
        />
      </View>
    );
  }

  const convertHtmlToPdf = async () => {
    setIsLoading(true); // Bắt đầu trạng thái loading
    try {
      const htmlClient = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        @media print {
            @page {
                size: A4;
                /* US letter */
                margin-left: 6mm;
                margin-right: 6mm;
                margin-top: 6mm;
                margin-bottom: 6mm;
            }
    
            tfoot {
                display: table-footer-group;
            }
    
            footer {
                display: inline-block;
            }
        }
    
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #fafafa;
        }
    
        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
    
        .invoice-container {
            position: relative;
            border: 2px solid;
            background-color: #ffffff;
            overflow: hidden;
            width: 210mm;
            min-height: 280mm;
            padding: 1mm;
            margin: auto;
            background: white;
        }
    
        .invoice-container th,
        .invoice-container tr,
        .invoice-container td {
            border-radius: 0;
        }
    
        .invoice-container th.capitalize {
            white-space: unset;
        }
    
        .acknowledgement {
            background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
        }
    
        #page-number {
            text-align: right;
            font-weight: lighter;
        }
    </style>
      </head>
      <body>
        <div>
        <div id="capture" class="invoice-container" style="position: relative; border: 2px solid; background-color: #ffffff; overflow: hidden; width: 210mm; min-height: 280mm; padding: 1mm; margin: auto; background: white;">
            <div style="display: flex; justify-content: space-between; padding: 1rem; align-items: center;">
              <img style="width: 350px; height: 60px;" src="${base64Image}" alt="logo">
        
              <div style="text-align: right; font-size: small;">
                  <p style="font-weight: bold; color: #0066cc;">
                      No.34 Loyang Crescent <br> Singapore 508993
                  </p>
                  <p>
                      <strong>T:</strong> <a href="tel:+6562857813" style="color: inherit; text-decoration: none;">+65 6285 7813</a>
                  </p>
                  <p>
                      <strong>E:</strong> <a href="mailto:enquiry@deltatech.com.sg" style="color: inherit; text-decoration: none;">
                          enquiry@deltatech.com.sg
                      </a>
                  </p>
                  <p>
                      <strong>W:</strong> <a href="http://www.deltatech.com.sg" target="_blank" style="color: inherit; text-decoration: none;">
                          www.deltatech.com.sg
                      </a>
                  </p>
              </div>
            </div>
    
    
            <table class="table table-compact w-full" style="width: 100%; border-collapse: collapse;">
              <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                      <tr style="background-color: #E5E7EB;">
                          <th style="text-align: center;padding: 10px; text-transform: capitalize; font-size: 20px;" colspan="4">
                              Project Delivery Order (PDO)
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Customer</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.company
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Date</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.created_at
                          }</td>
                      </tr>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Location</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.location
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Delivery Order Ref</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.delivery_order_ref
                          }</td>
                      </tr>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Contact Person</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.contact_person
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Project Ref No</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.project_code
                          }</td>
                      </tr>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Contact No</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.contact_number
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Client Ref</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.client_ref
                          }</td>
                      </tr>
                  </tbody>
              </table>
    
              <table class="table table-compact w-full" style="width: 100%; border-collapse: collapse;">
                <thead style="margin-top: 7rem;">
                  <tr style="margin-top: 7rem; background-color: #E5E7EB;">
                    ${header1
                      ?.map((item: string, index: number) => {
                        return `
                      <th style="text-transform: capitalize; padding:10px 0px;" key=${index}>
                      ${item}
                  </th>
                      `;
                      })
                      .join('')}
                  </tr>
                </thead>
    
                <tbody>
                  ${
                    dataDetailID['data'] &&
                    dataDetailID['data']
                      .map((item: any, index: number) => {
                        return `
                        <tr key=${index} style="border-bottom: 1px solid #ddd; margin: 10px; padding: 10px">
                          ${
                            item?.delivery_no ===
                            dataDetailID?.delivery_order_ref
                              ? header
                                  .map((header, headerIndex) => {
                                    switch (header) {
                                      case 'No.':
                                        return `<th>${index + 1}</th>`;
                                      case 'Description':
                                        return `
                                    <td key=${headerIndex}>
                                  
                                    <p style="font-size: 15px; padding: 0px; margin: 0px;">${
                                      item?.description
                                    }</p>
                                      <p style="font-size: 15px; padding: 2px; margin: 2px;"> Sub components:</p>
                                        <br />
                                        ${item?.total_sub_components
                                          .map(
                                            (item: string, index: number) => {
                                              return `<p key=${index} style="font-size: 15px; padding: 2px; margin: 2px;">
                                                - ${item}
                                              </p>`;
                                            },
                                          )
                                          .filter(Boolean)
                                          .join('')}
                                    
                                    </td>`;
                                      case 'Shutter No.':
                                        return `<td key=${headerIndex} style="text-align: center">${item?.shutter_number}</td>`;
                                      default:
                                        return `<td key=${headerIndex} style="text-align: center">${item[header]}</td>`;
                                    }
                                  })
                                  .join('')
                              : ''
                          }
                        </tr>`;
                      })
                      .join('')
                  }
                
                  <tr style="text-align: center; width: 100%;">
                    <th colspan="100" style="text-align: center;">Remark: ${
                      dataDetailID?.remark
                    }</th>
                  </tr>
                </tbody>
              </table>
    
    
              <table>
              <div style="background-color: #E5E7EB; padding: 0 8px;">
              <p style="text-align: center; font-weight: 700; color: black; font-size: 20px; padding: 8px">
                Acknowledgment
              </p>
            </div>
    
            <div style="display: flex; flex-direction: row; justify-content: space-around; border-bottom: 1px solid #ccc; padding: 0.5rem;">
            <p style="font-weight: bold; color: black; font-size: 16px;">Client Name</p>
            <p style="font-weight: bold; color: black; font-size: 16px;">Client Signature</p>
            <p style="font-weight: bold; color: black; font-size: 16px;">Delta Tech Personal</p>
          </div>
    
         
                  
            <div style="display: flex; flex-direction: row; justify-content: space-around;padding-left: 20px ;align-items: center; border-bottom: 1px solid #ccc; padding-top: 10px"">
              <p style="font-weight: bold; color: black; font-size: 16px; ">${
                infoClient?.name
              }</p>
              <img src=${`data:image/png;base64,${imgSignature}`} alt="Signature" style="height: 150px; width: 150px; padding-right: 20px" />
              <p style="font-weight: bold; color: black; font-size: 16px; padding-right: 40px;">${
                userInfo?.user_info?.full_name
              }</p>
            </div>
            
       
    
        <div>
        <div style="border-bottom: 1px solid #ccc; padding-left: 1rem; padding-right: 1rem;">
          <div style="display: flex; flex-direction: row; align-items: center;">
            <p style="font-weight: bold; color: black; font-size: 16px; padding-left: 1rem; padding-right: 2.5rem;">
              Name:
            </p>
            <p style="flex: 1; border: none; outline: none; padding: 0; font-size: 16px;">${
              infoClient?.name
            }</p>
          </div>
        </div>
    
        <div style="border-bottom: 1px solid #ccc; padding-left: 1rem; padding-right: 1rem;">
          <div style="display: flex; flex-direction: row; align-items: center;">
            <p style="font-weight: bold; color: black; font-size: 16px; padding-left: 1rem; padding-right: 1.5rem;">
              Contact:
            </p>
            <p
            style="flex: 1; border: none; outline: none; padding: 0; font-size: 16px;">${
              infoClient?.phone_number
            }</p>
          </div>
        </div>
    
        
          <div style="border-bottom: 1px solid #ccc; padding-left: 1rem; padding-right: 1rem; margin-bottom: 0.2rem;">
            <div style="display: flex; flex-direction: row; align-items: center;">
              <p style="font-weight: bold; color: black; font-size: 16px; padding-left: 1rem; padding-right: 2.7rem;">
                Email:
              </p>
    
              <p
            style="flex: 1; border: none; outline: none; padding: 0; font-size: 16px;">${
              infoClient?.email
            }</p>
            </div>
          </div>
        
      </div>
    
              </table>
    
            <tfoot>
              <tr>
                <td style="text-align: right;">
                  <div id="page-number" style="margin-top: 10px; background-color: #E5E7EB;">
                   <p style="font-weight: 400; padding: 8px;"> Delivery Order Ref: ${
                     dataDetailID?.delivery_order_ref
                   }</p>
                  </div>
                </td>
              </tr>
            </tfoot>
    
        
            </table>
          </div>
        </div>
      </body>
      </html>
      `;

      const htmlInternal = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        @media print {
            @page {
                size: A4;
                /* US letter */
                margin-left: 6mm;
                margin-right: 6mm;
                margin-top: 6mm;
                margin-bottom: 6mm;
            }
    
            tfoot {
                display: table-footer-group;
            }
    
            footer {
                display: inline-block;
            }
        }
    
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #fafafa;
        }
    
        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
    
        .invoice-container {
            position: relative;
            border: 2px solid;
            background-color: #ffffff;
            overflow: hidden;
            width: 210mm;
            min-height: 280mm;
            padding: 1mm;
            margin: auto;
            background: white;
        }
    
        .invoice-container th,
        .invoice-container tr,
        .invoice-container td {
            border-radius: 0;
        }
    
        .invoice-container th.capitalize {
            white-space: unset;
        }
    
        .acknowledgement {
            background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
        }
    
        #page-number {
            text-align: right;
            font-weight: lighter;
        }

         img {page-break-inside: avoid; /* Tránh chia cắt ảnh giữa các trang */
    }
    </style>
      </head>
      <body>
        <div>
        <div id="capture" class="invoice-container" style="position: relative; border: 2px solid; background-color: #ffffff; overflow: hidden; width: 210mm; min-height: 280mm; padding: 1mm; margin: auto; background: white;">
            <div style="display: flex; justify-content: space-between; padding: 1rem; align-items: center;">
              <img style="width: 350px; height: 60px;" src="${base64Image}" alt="logo">
        
              <div style="text-align: right; font-size: small;">
                  <p style="font-weight: bold; color: #0066cc;">
                      No.34 Loyang Crescent <br> Singapore 508993
                  </p>
                  <p>
                      <strong>T:</strong> <a href="tel:+6562857813" style="color: inherit; text-decoration: none;">+65 6285 7813</a>
                  </p>
                  <p>
                      <strong>E:</strong> <a href="mailto:enquiry@deltatech.com.sg" style="color: inherit; text-decoration: none;">
                          enquiry@deltatech.com.sg
                      </a>
                  </p>
                  <p>
                      <strong>W:</strong> <a href="http://www.deltatech.com.sg" target="_blank" style="color: inherit; text-decoration: none;">
                          www.deltatech.com.sg
                      </a>
                  </p>
              </div>
            </div>
    
    
            <table class="table table-compact w-full" style="width: 100%; border-collapse: collapse;">
              <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                      <tr style="background-color: #E5E7EB;">
                          <th style="text-align: center;padding: 10px; text-transform: capitalize; font-size: 20px;" colspan="4">
                              Project Delivery Order (PDO)
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Customer</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.company
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Date</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.created_at
                          }</td>
                      </tr>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Location</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.location
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Delivery Order Ref</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.delivery_order_ref
                          }</td>
                      </tr>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Contact Person</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.contact_person
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Project Ref No</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.project_code
                          }</td>
                      </tr>
                      <tr>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Contact No</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.contact_number
                          }</td>
                          <th style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">Client Ref</th>
                          <td style="border-bottom: 1px solid #ddd; padding: 8px;text-align: left;">${
                            dataDetailID?.client_ref
                          }</td>
                      </tr>
                  </tbody>
              </table>
    
              <table class="table table-compact w-full" style="width: 100%; border-collapse: collapse;">
                <thead style="margin-top: 7rem;">
                  <tr style="margin-top: 7rem; background-color: #E5E7EB;">
                    ${header1
                      ?.map((item: string, index: number) => {
                        return `
                      <th style="text-transform: capitalize; padding:10px 0px;" key=${index}>
                      ${item}
                  </th>
                      `;
                      })
                      .join('')}
                  </tr>
                </thead>
    
                <tbody>
                  ${
                    dataDetailID['data'] &&
                    dataDetailID['data']
                      .map((item: any, index: number) => {
                        return `
                        <tr key=${index} style="border-bottom: 1px solid #ddd; margin: 10px; padding: 10px">
                          ${
                            item?.delivery_no ===
                            dataDetailID?.delivery_order_ref
                              ? header
                                  .map((header, headerIndex) => {
                                    switch (header) {
                                      case 'No.':
                                        return `<th>${index + 1}</th>`;
                                      case 'Description':
                                        return `
                                    <td key=${headerIndex}>
                                  
                                    <p style="font-size: 15px; padding: 0px; margin: 0px;">${
                                      item?.description
                                    }</p>
                                      <p style="font-size: 15px; padding: 2px; margin: 2px;"> Sub components:</p>
                                        <br />
                                        ${item?.total_sub_components
                                          .map(
                                            (item: string, index: number) => {
                                              return `<p key=${index} style="font-size: 15px; padding: 2px; margin: 2px;">
                                                - ${item}
                                              </p>`;
                                            },
                                          )
                                          .filter(Boolean)
                                          .join('')}
                                    
                                    </td>`;
                                      case 'Shutter No.':
                                        return `<td key=${headerIndex} style="text-align: center">${item?.shutter_number}</td>`;
                                      default:
                                        return `<td key=${headerIndex} style="text-align: center">${item[header]}</td>`;
                                    }
                                  })
                                  .join('')
                              : ''
                          }
                        </tr>`;
                      })
                      .join('')
                  }
                
                  <tr style="text-align: center; width: 100%;">
                    <th colspan="100" style="text-align: center;">Remark: ${
                      dataDetailID?.remark
                    }</th>
                  </tr>



                </tbody>
              </table>
    
    
              
              <div style="background-color: #E5E7EB; padding: 0 8px;">
              <p style="text-align: center; font-weight: 700; color: black; font-size: 20px; padding: 8px">
                Acknowledgment
              </p>
            </div>
        <div>
          <div style="display: flex; flex-direction: row; justify-content: space-around; padding: 0.5rem;">
            <p style="font-weight: bold; color: black; font-size: 16px;">Name</p>
            <p style="font-weight: bold; color: black; font-size: 16px;">Logistic Personnel Signature</p>
            <p style="font-weight: bold; color: black; font-size: 16px;">Material Loaded Photo</p>
          </div>
    
         
                  
            <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center;  padding-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
              <p style="font-weight: bold; color: black; font-size: 16px;">${
                dataDetailID?.loading_by
              }</p>
              <img src=${
                dataDetailID?.loading_sign
              } alt="Signature" style="height: 150px; width: 150px; padding-right: 30px" />
              <img src=${
                dataDetailID?.loading_img
              } alt="Signature" style="height: 150px; width: 150px; padding-right: 20px" />
              
            </div>
            
          
      </div>
    
    
    <div class="content">
          <div style="display: flex; flex-direction: row; padding: 0.5rem;">
            <p style="font-weight: bold; color: black; font-size: 16px; margin-left: 60px">Name</p>
            <p style="font-weight: bold; color: black; font-size: 16px; margin-left: 170px">Driver Signature</p>
            <p style="font-weight: bold; color: black; font-size: 16px; margin-left: 210px">Photo</p>
          </div>
    
         
                  
            <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center;  padding-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
              <p style="font-weight: bold; color: black; font-size: 16px;">${
                dataDetailID?.driver_by
              }</p>
              <img src=${
                dataDetailID?.driver_sign
              } alt="Signature" style="height: 150px; width: 150px; padding-right: 30px" />
              <img src=${
                dataDetailID?.driver_img
              } alt="Signature" style="height: 150px; width: 150px; padding-right: 20px" />
              
            </div>
            
          
    </div>
    
    
    
     <div class="content">
          <div style="display: flex; flex-direction: row; padding: 0.5rem;">
            <p style="font-weight: bold; color: black; font-size: 16px; margin-left: 60px">Name</p>
            <p style="font-weight: bold; color: black; font-size: 16px; margin-left: 170px">Supervisor Signature</p>
            <p style="font-weight: bold; color: black; font-size: 16px; margin-left: 170px">Photo</p>
          </div>
    
         
                  
            <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center;  padding-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
              <p style="font-weight: bold; color: black; font-size: 16px;">${
                dataDetailID?.unload_by
              }</p>
              <img src=${
                dataDetailID?.unload_sign
              } alt="Signature" style="height: 150px; width: 150px; padding-right: 30px" />
              <img src=${
                dataDetailID?.unload_img
              } alt="Signature" style="height: 150px; width: 150px; padding-right: 20px" />
              
            </div>
            
          
    </div>
    
   
    
             
    
            <tfoot>
              <tr>
                <td style="text-align: right;">
                  <div id="page-number" style="margin-top: 10px; background-color: #E5E7EB;">
                   <p style="font-weight: 400; padding: 8px;"> Delivery Order Ref: ${
                     dataDetailID?.delivery_order_ref
                   }</p>
                  </div>
                </td>
              </tr>
            </tfoot>
    
        
            </table>
          </div>
        </div>
      </body>
      </html>
      `;

      // Tùy chọn cho file PDF từ htmlContent1
      const optionClient = {
        html: htmlClient, // Sửa ở đây
        fileName: 'sample_client',
        directory: 'docs',
      };

      // Tùy chọn cho file PDF từ htmlContent2
      const optionInternal = {
        html: htmlInternal, // Sửa ở đây
        fileName: 'sample_internal',
        directory: 'docs',
      };

      // Tạo PDF từ htmlContent1
      const fileClient = await RNHTMLtoPDF.convert(optionClient);
      // Tạo PDF từ htmlContent2
      const fileInternal = await RNHTMLtoPDF.convert(optionInternal);

      if (fileClient.filePath && fileInternal.filePath) {
        // Gửi PDF đến API
        await uploadPDF(fileClient.filePath, fileInternal.filePath);
      }
    } catch (error) {
      // Alert.alert('Error', 'Failed to create PDF');
      console.error(error);
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  const uploadPDF = async (filePath: string, filePathInternal: string) => {
    try {
      const formData = new FormData();
      formData.append('pdf_file_external', {
        uri: `file://${filePath}`,
        name: 'sample.pdf',
        type: 'application/pdf',
      });

      formData.append('pdf_file_internal', {
        uri: `file://${filePathInternal}`,
        name: 'sample.pdf',
        type: 'application/pdf',
      });

      const response = await apiAxiosV2.put(
        api.putLogisticEmail(productId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // if (response.status === 200) {
      //   Alert.alert('Success', 'PDF uploaded successfully');
      // } else {
      //   Alert.alert('Error', 'Failed to upload PDF');
      // }
    } catch (error) {
      // Alert.alert('Error', 'Failed to upload PDF');
      console.error(error);
    }
  };

  const handleSubmit = async (caseType: string) => {
    // Validate external case
    if (
      caseType === 'external' &&
      (!infoClient?.name || !infoClient?.email || !infoClient?.phone_number)
    ) {
      return Alert.alert(
        'Please provide the name, email, and phone number before submitting.',
      );
    }

    // Validate images
    if (!imagePicture || !imgSignature) {
      return Alert.alert(
        'Please provide both the signature and the image before submitting.',
      );
    }

    setIsLoading(true);

    const formData = new FormData();

    // Mapping case types to their respective field names
    const fieldMappings = {
      uploading: {
        signature: 'loading_signature',
        img: 'loading_img',
        imgName: 'loading_img_A.jpg',
        signatureName: 'loading_signature_A.png',
      },
      driver: {
        signature: 'driver_signature',
        img: 'driver_img',
        imgName: 'loading_img_B.jpg',
        signatureName: 'loading_signature_B.png',
      },
      unloading: {
        signature: 'unload_signature',
        img: 'unload_img',
        imgName: 'loading_img_C.jpg',
        signatureName: 'loading_signature_C.png',
      },
      external: {
        signature: 'client_image',
        img: 'client_sign',
        imgName: 'loading_img_C.jpg',
        signatureName: 'loading_signature_C.png',
      },
    };

    const selectedFields = fieldMappings[caseType];

    // Check for valid case type
    if (!selectedFields) {
      setIsLoading(false);
      return Alert.alert('Invalid case type');
    }

    // Append data to FormData
    formData.append(selectedFields.signature, {
      uri: `data:image/png;base64,${imgSignature}`,
      type: 'image/png',
      name: selectedFields.signatureName,
    });

    formData.append(selectedFields.img, {
      uri: imagePicture,
      type: 'image/jpeg',
      name: selectedFields.imgName,
    });

    // Prepare the API endpoint
    const apiEndpoints = {
      uploading: api.putLogisticUploader(productId),
      driver: api.putLogisticDriver(productId),
      unloading: api.putLogisticUnloader(productId),
      external: api.putLogisticClient(
        productId,
        infoClient.name,
        infoClient.email,
        infoClient.phone_number,
      ),
    };

    const apiEndpoint = apiEndpoints[caseType];

    try {
      const response = await apiAxiosV2.put(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      });

      // Reset state and navigate if successful
      if (response.status === 200) {
        if (caseType === 'external') {
          await convertHtmlToPdf();
        }
        resetState();
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error submitting form: ', error);
      Alert.alert('Error', 'Failed to upload data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to reset state
  const resetState = () => {
    setImagePicture('');
    setImgSignature('');
    setInfoClient({name: '', email: '', phone_number: ''});
    queryClient.invalidateQueries({queryKey: ['dataTotalListLogistic']});
    queryClient.invalidateQueries({
      queryKey: ['dataTotalListLogisticExternal'],
    });
    queryClient.invalidateQueries({queryKey: ['dataHomeInternalV2']});
    queryClient.invalidateQueries({queryKey: ['dataHomeExternalV2']});
    queryClient.invalidateQueries({queryKey: ['dataDetailExternal']});
    refetchDataDetailID();
  };

  return isLoadingDataDetailID ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <LottieView
        source={require('../../../../assets/animations/Delta logo animation v3.json')} // Replace with your animation JSON file path
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={{marginBottom: 10}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}>
          <Image
            source={require('../../../../assets/images/logo2.png')}
            style={styles.image}
          />
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 10, color: '#2563EB'}}>
              No.34 Loyang Crescent Singapore 508993
            </Text>
            <Text style={{fontSize: 10, color: '#2563EB'}}>
              <Text style={{fontWeight: 'bold'}}>
                T:<Text>+65 6285 7813</Text>
              </Text>
            </Text>

            <Text style={{fontSize: 10, color: '#2563EB'}}>
              <Text style={{fontWeight: 'bold'}}>
                E:<Text>enquiry@deltatech.com.sg</Text>
              </Text>
            </Text>

            <Text style={{fontSize: 10, color: '#2563EB'}}>
              <Text style={{fontWeight: 'bold'}}>
                W:<Text>www.deltatech.com.sg</Text>
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View>
        {/* ProjectDelivery */}

        <InfoDelivery dataDetail={dataDetailID} />

        {/* Acknowlegdement */}
        <AcknowAndSign
          dataDetail={dataDetailID}
          activeButton={activeButton}
          handleFiledChange={handleFiledChange}
          infoClient={infoClient}
          // dataDetailExternal={dataDetailExternal}
          isLoading={isLoading}
        />

        <TouchableOpacity
          onPress={() =>
            handleSubmit(
              activeButton === 'internal' ? selectedButtonProcess : 'external',
            )
          }
          // onPress={convertHtmlToPdf}
          style={{marginBottom: 20}}>
          <Text
            style={{
              backgroundColor: '#0D75BE',
              width: '100%',
              color: 'white',
              // textTransform: 'uppercase',
              fontFamily: 'Roboto-Regular',
              textAlign: 'center',
              padding: 8,
              paddingVertical: 15,
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              'Submit'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
    height: 150,
  },
  container: {
    padding: 10,
    marginBottom: 110,
  },
  image: {
    width: 160,
    height: 30,
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
