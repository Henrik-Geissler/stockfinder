import { getSearchName } from '../../../api/generated/search-name/getSearchName'
import { Security } from '../../../domain/Security'
import { SearchNameResponseDTOtoSecurity } from './toDomain/SearchNameResponseDTOtoSecurity'

// Search for securities by query (name or symbol)
export async function findSecuritiesByName(
  query: string,
  limit: number = 10
): Promise<Security[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const data = await getSearchName(query, limit)
    return data.map(SearchNameResponseDTOtoSecurity) || []
  } catch (error) {
    // FMP API returns error object when no search results are found
    // Return empty array instead of throwing error
    console.warn('Search failed:', error)
    return []
  }
}
