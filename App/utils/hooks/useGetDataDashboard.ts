import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {apiAxiosV1} from '../../../App/api/api';
import {api} from '../../services/endpoint';

export const useGetDataDashboard = (numberOfDay?: number, category?: any) => {
  const token = AsyncStorage.getItem('accessToken');
  const url = token ? `Bearer ${token}` : '';
  const headers = {
    Authorization: url,
    accept: 'application/json',
  };

  // console.log({token});

  // data dashboard
  const fetchDataDashboard = async (numberOfDay: number, category: string) => {
    try {
      const response = await apiAxiosV1.get(
        api.getDataInstallationsDashboard(numberOfDay, category),
      );
      return response.data;
    } catch (error) {
      console.error('data dashboard', error);
      throw error;
    }
  };

  // data dashboard
  const {data: dataDashboard, isLoading: isLoadingDashboard} = useQuery({
    queryKey: ['dataDashboard', numberOfDay, category],
    queryFn: () => fetchDataDashboard(numberOfDay as number, category),
    enabled: !!token && !!numberOfDay,
  });

  return {
    dataDashboard,
    isLoadingDashboard,
  };
};
