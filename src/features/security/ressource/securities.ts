// Securities-specific API functions using the general API client

import { makeRequestWithErrorHandling } from '../../../api/client'
import type { CompanyProfile } from '../domain/CompanyProfile'

// Get company profile by symbol
export async function getCompanyProfileBySymbol(
  symbol: string
): Promise<CompanyProfile> {
  const data = await makeRequestWithErrorHandling<CompanyProfile[]>(
    `/profile?symbol=${symbol}`,
    `Failed to fetch profile for symbol: ${symbol}`
  )

  if (!data || data.length === 0) {
    throw new Error(`No profile data found for symbol: ${symbol}`)
  }

  return data[0]
}
