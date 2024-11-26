import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const BASE_URL = 'https://ec2api.deltatech-backend.com/api/v1';

export const api = {
  getDataProduct: (currentPage?: number, searchValue?: string) =>
    `${BASE_URL}/installations?page=${currentPage}&project_code=${searchValue}`,

  getDataProductDetail: (productId: number) =>
    `${BASE_URL}/installations/${productId}`,
  putDataDetailToEmail: (productId: number) =>
    `${BASE_URL}/logistic/email/${productId}`,
  putDataDetailEdit: (productId: number) => `${BASE_URL}/logistic/${productId}`,

  getDataInvoices: (currentPage?: number, searchValue?: string) =>
    `/installations?page=${currentPage}&project_code_or_serial_no=${searchValue}`,

  getDataInvoicesDetail: (serialNo: number) => `/installations/${serialNo}`,

  putDataInvoices: (serialNo: number) =>
    `/installations/installation/${serialNo}`,

  getDataInstallationsDashboard: (numberOfDay?: number, category?: any) =>
    `/installations/get_dashboard_of_installation_day?number_of_days=${numberOfDay}&category=${category}`,

  putChangePassword: `/auth/change-password`,

  getDataProductDO: (
    currentPage?: number,
    searchValue?: string,
    signed?: string,
  ) =>
    `/logistic?page=${currentPage}&delivery_order_ref_or_company_search=${searchValue?.toUpperCase()}&signed=${signed}`,

  getDataProductDetailDO: (productId: number) => `/logistic/${productId}`,

  // new API

  getListLogisticV2: (
    currentPage?: number,
    searchValue?: string,
    status?: string,
  ) =>
    `/logistic?page=${currentPage}&delivery_order_ref_or_company_search=${searchValue?.toUpperCase()}&status=${status}`,

  getListLogisticExternalV2: (
    currentPage?: number,
    searchValue?: string,
    status?: string,
  ) =>
    `/logistic/external?page=${currentPage}&delivery_order_ref_or_company_search=${searchValue?.toUpperCase()}&status=${status}`,

  getListLogisticInternalIDV2: (id: number) => `/logistic/${id}`,

  getDetailLogisticExternalV2: (id: number) => `/logistic/external/${id}`,

  getDataHomeInternalV2: (
    numberOfDay?: number,
    searchProject?: string,
    category?: any,
  ) =>
    `/logistic/home?number_of_days=${numberOfDay}&search_by_project_code=${searchProject}&category=${category}`,

  getDataHomeExternalV2: (numberOfDay?: number, searchProject?: string) =>
    `/logistic/external/home?number_of_days=${numberOfDay}&search_by_project_code=${searchProject}`,

  putLogisticUploader: (id: number) => `/logistic/uploader/${id}`,

  putLogisticDriver: (id: number) => `/logistic/driver/${id}`,

  putLogisticUnloader: (id: number) => `/logistic/unloaded/${id}`,

  putLogisticClient: (
    id: number,
    name: string,
    email: string,
    phone_number: string,
  ) =>
    `/logistic/client/${id}?name=${name}&email=${email}&phone_number=${phone_number}`,

  putLogisticEmail: (id: number) => `/logistic/email/${id}`,
};
