import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: true, 
      retry: 1, 
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});