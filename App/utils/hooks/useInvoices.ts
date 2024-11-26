import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {useContext} from 'react';
import apiAxios from '../../../App/api/api';
import {AuthContext} from '../../context/AuthContext';
import {api} from '../../services/api/endpoint';

export const useInvoices = (
  currentPage?: number,
  debouncedSearchValue?: string,
) => {
  const {logout} = useContext(AuthContext);
  // const token = userInfo.access_token || '';
  const token = AsyncStorage.getItem('accessToken');
  const url = token ? `Bearer ${token}` : '';

  const fetchDataInvoices = async (
    currentPage?: number,
    searchValue?: string,
  ) => {
    try {
      const response = await apiAxios.get(
        api.getDataInvoices(currentPage, searchValue),
      );
      return response.data;
    } catch (error) {
      // logout();
      console.log('data Invoice', error);
    }
  };

  const {data: dataTotalInvoices, isLoading: isLoadingInvoices} = useQuery({
    queryKey: ['dataTotalInvoices', currentPage, debouncedSearchValue],
    queryFn: () => fetchDataInvoices(currentPage, debouncedSearchValue),
    enabled: !!token,
  });

  return {
    dataTotalInvoices,
    isLoadingInvoices,
  };
};
