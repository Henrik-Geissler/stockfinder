import { useQuery } from '@tanstack/react-query'
import { getSecurityProfileBySymbol } from '../adapter/getSecurityProfileBySymbol'

export const useSecurityProfile = (symbol: string) =>
  useQuery({
    queryKey: ['securityProfile', symbol],
    queryFn: () => getSecurityProfileBySymbol(symbol),
    enabled: !!symbol, // Only run query if symbol is provided
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  })
