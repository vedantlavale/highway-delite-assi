import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getExperiences, 
  getExperience, 
  validatePromoCode, 
  createBooking,
} from './api';

export const queryKeys = {
  experiences: (page: number, limit: number, search: string) => 
    ['experiences', page, limit, search] as const,
  experience: (id: string) => ['experience', id] as const,
  promoCode: (code: string, subtotal: number) => ['promoCode', code, subtotal] as const,
};

export function useExperiences(page: number, limit: number, search: string) {
  return useQuery({
    queryKey: queryKeys.experiences(page, limit, search),
    queryFn: () => getExperiences(page, limit, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    // Prefetch next page
    placeholderData: (previousData) => previousData,
  });
}

export function useExperience(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.experience(id || ''),
    queryFn: () => getExperience(id!),
    enabled: !!id, // Only run query if id exists
    staleTime: 10 * 60 * 1000, // 10 minutes - single experiences don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook for validating promo code
export function useValidatePromo() {
  return useMutation({
    mutationFn: ({ code, subtotal }: { code: string; subtotal: number }) =>
      validatePromoCode(code, subtotal),
  });
}

// Hook for creating booking
export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (_data, variables) => {
      // Invalidate and refetch the experience to update available slots
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.experience(variables.experienceId) 
      });
      
      // Also invalidate experiences list
      queryClient.invalidateQueries({ 
        queryKey: ['experiences'] 
      });
    },
  });
}

export function usePrefetchExperiences(page: number, limit: number, search: string) {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.experiences(page, limit, search),
      queryFn: () => getExperiences(page, limit, search),
      staleTime: 5 * 60 * 1000,
    });
  };
}

export function usePrefetchExperience(id: string) {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.experience(id),
      queryFn: () => getExperience(id),
      staleTime: 10 * 60 * 1000,
    });
  };
}
