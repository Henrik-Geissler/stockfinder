import { makeRequestWithErrorHandling } from '../../../client'
import { HistoricalPriceEodResponseDTO } from './types/HistoricalPriceEodResponseDTO'

// Historical price data point interface

// Get historical price data for a symbol
export async function getHistoricalPriceEodLight(
  symbol: string,
  from?: string,
  to?: string
): Promise<HistoricalPriceEodResponseDTO[] | undefined> {
  if (!symbol) {
    throw new Error('Symbol is required')
  }

  try {
    // Build query parameters
    const params = new URLSearchParams({
      symbol: symbol.toUpperCase(),
    })

    if (from) {
      params.append('from', from)
    }

    if (to) {
      params.append('to', to)
    }

    const data = await makeRequestWithErrorHandling<
      HistoricalPriceEodResponseDTO[]
    >(
      `/historical-price-eod/light?${params.toString()}`,
      `Failed to fetch historical prices for ${symbol}`
    )

    return data
  } catch (error) {
    console.error('Error fetching historical prices:', error)
    throw error
  }
}
