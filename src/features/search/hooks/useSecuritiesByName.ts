import { useQuery } from '@tanstack/react-query'
import { findSecuritiesByName } from '../adapter/findSecuritiesByName'
// Search for securities by query (name or symbol)
export function useSecuritiesByName(query: string, limit: number = 8) {
  return useQuery({
    queryKey: ['searchDropdown', query],
    queryFn: () => findSecuritiesByName(query, limit), // Limit to 8 results for dropdown
    enabled: !!query && query.length >= 2, // Only search with 2+ characters
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
    placeholderData: previousData => previousData, // Keep previous results while fetching new ones
  })
}
