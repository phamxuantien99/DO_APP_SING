import {useQuery} from '@tanstack/react-query';
import apiAxios from '../../../App/api/api';
import {api} from '../../services/endpoint';

export const useGetDataDetail = (serial_no: number) => {
  const fetchDataDetail = async (serial_no: number) => {
    try {
      const response = await apiAxios.get(api.getDataInvoicesDetail(serial_no));
      return response.data;
    } catch (error) {
      console.error('data detail', error);
      throw error;
    }
  };

  const {data: dataDetail, isLoading: isLoadingDetail} = useQuery({
    queryKey: ['dataDetail', serial_no],
    queryFn: () => fetchDataDetail(serial_no),
    enabled: !!serial_no,
  });

  return {
    dataDetail,
    isLoadingDetail,
  };
};
