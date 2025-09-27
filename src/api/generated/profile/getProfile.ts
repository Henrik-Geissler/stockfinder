// Securities-specific API functions using the general API client

import { makeRequestWithErrorHandling } from '../../client'
import type { ProfileResponseDTO } from './types/ProfileResponseDTO'

// Get company profile by symbol
export async function getProfile(
  symbol: string
): Promise<ProfileResponseDTO[]> {
  const data = await makeRequestWithErrorHandling<ProfileResponseDTO[]>(
    `/profile?symbol=${symbol}`,
    `Failed to fetch profile for symbol: ${symbol}`
  )

  return data
}
