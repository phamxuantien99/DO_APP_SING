import {useQuery} from '@tanstack/react-query';
import {api} from '../../services/endpoint';
import {apiAxiosV2} from '../../api/api';

export const useGetDataDetailExternal = (invoiceId: number) => {
  const fetchDataDetail = async (invoiceId: number) => {
    try {
      const response = await apiAxiosV2.get(
        api.getDetailLogisticExternalV2(invoiceId),
      );
      return response.data;
    } catch (error) {
      console.error('data detail dataDetailExternal', error);
      throw error;
    }
  };

  const {
    data: dataDetailExternal,
    refetch: refetchDetailExternal,
    isLoading: isLoadingDetailExternal,
  } = useQuery({
    queryKey: ['dataDetailExternal', invoiceId],
    queryFn: () => fetchDataDetail(invoiceId),
    enabled: !!invoiceId,
  });

  return {
    dataDetailExternal,
    isLoadingDetailExternal,
    refetchDetailExternal,
  };
};
