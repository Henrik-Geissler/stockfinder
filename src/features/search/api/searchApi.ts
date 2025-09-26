// Search feature API functions using the general API client

import { makeRequestWithErrorHandling } from '../../../api/client'
import { SearchResult } from '../domain/SearchResult'

// Search for securities by query (name or symbol)
export async function searchSecurities(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const data = await makeRequestWithErrorHandling<SearchResult[]>(
      `/search-name?query=${encodeURIComponent(query.trim())}&limit=${limit}`,
      `Failed to search for: ${query}`
    )

    return data || []
  } catch (error) {
    // Return empty array instead of throwing error
    console.warn('Search failed:', error)
    return []
  }
}
