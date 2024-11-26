import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {apiAxiosV2} from '../../../App/api/api';
import {api} from '../../services/endpoint';

export const useGetDataHomeExternalV2 = (
  numberOfDay?: number,
  searchProject?: string,
) => {
  const token = AsyncStorage.getItem('accessToken');
  const url = token ? `Bearer ${token}` : '';
  const headers = {
    Authorization: url,
    accept: 'application/json',
  };

  // data dashboard
  const fetchDataDashboard = async (
    numberOfDay: number,
    searchProject?: string,
  ) => {
    try {
      const response = await apiAxiosV2.get(
        api.getDataHomeExternalV2(numberOfDay, searchProject),
      );
      return response.data;
    } catch (error) {
      console.error('data dashboard dataHome ExternalV2', error);
      throw error;
    }
  };

  // data dashboard
  const {data: dataHomeExternalV2, isLoading: isLoadingHomeExternalV2} =
    useQuery({
      queryKey: ['dataHomeExternalV2', numberOfDay, searchProject],
      queryFn: () => fetchDataDashboard(numberOfDay as number, searchProject),
      enabled: !!numberOfDay,
    });

  return {
    dataHomeExternalV2,
    isLoadingHomeExternalV2,
  };
};
