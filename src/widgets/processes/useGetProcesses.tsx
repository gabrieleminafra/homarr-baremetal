import { api } from '~/utils/api';

export const useGetProcesses = () => {
  return api.processes.get.useQuery(undefined, {
    refetchInterval: 10000,
  });
};
