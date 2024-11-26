import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import apiAxios from '../../../App/api/api';
import {api} from '../../services/endpoint';

export const useProductDO = (
  currentPage?: number,
  debouncedSearchValue?: string,
  isSigned?: string,
) => {
  const token = AsyncStorage.getItem('accessToken');

  const fetchDataSigned = async (
    currentPage?: number,
    searchValue?: string,
    signed?: string,
  ) => {
    try {
      return await apiAxios
        .get(api.getDataProductDO(currentPage, searchValue, signed))
        .then(res => res.data);
    } catch (error) {
      // logout();
      return {error: 'Failed to fetch data'};
    }
  };

  const {data: dataTotalProduct, isLoading: isLoadingProduct} = useQuery({
    queryKey: ['dataTotalProduct', currentPage, debouncedSearchValue, isSigned],
    queryFn: () => fetchDataSigned(currentPage, debouncedSearchValue, isSigned),
    enabled: !!token,
  });

  return {
    dataTotalProduct,
    isLoadingProduct,
  };
};
