import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {apiAxiosV2} from '../../api/api';
import {api} from '../../services/endpoint';

export const useGetListLogisticExternal = (
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
        .get(api.getListLogisticExternalV2(currentPage, searchValue, status))
        .then(res => res.data);
    } catch (error) {
      return {error: 'Failed to fetch data'};
    }
  };

  const {
    data: dataTotalListLogisticExternal,
    isLoading: isLoadingListLogisticExternal,
  } = useQuery({
    queryKey: [
      'dataTotalListLogisticExternal',
      currentPage,
      searchValue,
      status,
    ],
    queryFn: () => fetchDataListLogistic(currentPage, searchValue, status),
    enabled: !!token,
  });

  return {
    dataTotalListLogisticExternal,
    isLoadingListLogisticExternal,
  };
};
