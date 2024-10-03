import { api } from '~/utils/api';

export const useGetDownloadClientsQueue = () => {
  return api.download.get.useQuery(undefined, {
    refetchInterval: 2000,
  });
};
