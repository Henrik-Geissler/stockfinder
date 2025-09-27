// Search feature API functions using the general API client

import { makeRequestWithErrorHandling } from '../../client'
import { SearchNameResponseDTO } from './types/SearchNameResponseDTO'

// Search for securities by query (name or symbol)
export async function getSearchName(
  query: string,
  limit: number = 10
): Promise<SearchNameResponseDTO[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const data = await makeRequestWithErrorHandling<SearchNameResponseDTO[]>(
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
