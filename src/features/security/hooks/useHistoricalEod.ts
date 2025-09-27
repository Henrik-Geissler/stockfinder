import { useQuery } from '@tanstack/react-query'
import { getHistoricalEodBySymbol } from '../adapter/getHistoricalEodBySymbol'

export const useHistoricalEod = (symbol: string, selectedPeriod: string) =>
  useQuery({
    queryKey: ['historicalPrices', symbol, selectedPeriod],
    queryFn: () => getHistoricalEodBySymbol(symbol, selectedPeriod),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: previousData => previousData, // Keep previous results while fetching new ones
  })
