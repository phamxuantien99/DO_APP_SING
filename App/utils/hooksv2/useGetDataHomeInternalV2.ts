import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {apiAxiosV2} from '../../../App/api/api';
import {api} from '../../services/endpoint';

export const useGetDataHomeInternalV2 = (
  numberOfDay?: number,
  searchProject?: string,
  category?: any,
) => {
  const token = AsyncStorage.getItem('accessToken');
  const url = token ? `Bearer ${token}` : '';
  const headers = {
    Authorization: url,
    accept: 'application/json',
  };

  // console.log({token});

  // data dashboard
  const fetchDataDashboard = async (
    numberOfDay: number,
    searchProject?: string,
    category?: string,
  ) => {
    try {
      const response = await apiAxiosV2.get(
        api.getDataHomeInternalV2(numberOfDay, searchProject, category),
      );
      return response.data;
    } catch (error) {
      console.error('data dashboard internal home', error);
      throw error;
    }
  };

  // data dashboard
  const {data: dataHomeInternalV2, isLoading: isLoadingHomeInternalV2} =
    useQuery({
      queryKey: ['dataHomeInternalV2', numberOfDay, category, searchProject],
      queryFn: () =>
        fetchDataDashboard(numberOfDay as number, searchProject, category),
      enabled: !!numberOfDay,
    });

  return {
    dataHomeInternalV2,
    isLoadingHomeInternalV2,
  };
};
