import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {apiAxiosV2} from '../../api/api';
import {api} from '../../services/endpoint';

export const useGetListLogistic = (
  currentPage?: number,
  searchValue?: string,
  status?: string,
) => {
  const token = AsyncStorage.getItem('accessToken');

  const fetchDataListLogistic = async (
    currentPage?: number,
    searchValue?: string,
    status?: string,
  ) => {
    try {
      return await apiAxiosV2
        .get(api.getListLogisticV2(currentPage, searchValue, status))
        .then(res => res.data);
    } catch (error) {
      return {error: 'Failed to fetch data'};
    }
  };

  const {data: dataTotalListLogistic, isLoading: isLoadingListLogistic} =
    useQuery({
      queryKey: ['dataTotalListLogistic', currentPage, searchValue, status],
      queryFn: () => fetchDataListLogistic(currentPage, searchValue, status),
      enabled: !!token,
    });

  return {
    dataTotalListLogistic,
    isLoadingListLogistic,
  };
};
