import { makeRequestWithErrorHandling } from '../../../api/client'

// Historical price data point interface
export interface HistoricalPricePoint {
  date: string
  volume: number
  price: number
  symbol: string
}

// Get historical price data for a symbol
export async function getHistoricalPrices(
  symbol: string,
  from?: string,
  to?: string
): Promise<HistoricalPricePoint[]> {
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

    const data = await makeRequestWithErrorHandling<HistoricalPricePoint[]>(
      `/historical-price-eod/light?${params.toString()}`,
      `Failed to fetch historical prices for ${symbol}`
    )

    // Return historical data in reverse chronological order (newest first)
    return data?.reverse() || []
  } catch (error) {
    console.error('Error fetching historical prices:', error)
    throw error
  }
}

// Helper function to get date range based on period
export function getDateRangeForPeriod(period: string): {
  from?: string
  to?: string
} {
  const today = new Date()
  const to = today.toISOString().split('T')[0] // YYYY-MM-DD format

  switch (period) {
    case '1d':
      // For today, get last 7 days to ensure we have data
      const weekAgo = new Date(today)
      weekAgo.setDate(today.getDate() - 7)
      return {
        from: weekAgo.toISOString().split('T')[0],
        to,
      }

    case '1w':
      const weekAgoDate = new Date(today)
      weekAgoDate.setDate(today.getDate() - 7)
      return {
        from: weekAgoDate.toISOString().split('T')[0],
        to,
      }

    case '1m':
      const monthAgo = new Date(today)
      monthAgo.setMonth(today.getMonth() - 1)
      return {
        from: monthAgo.toISOString().split('T')[0],
        to,
      }

    case 'ytd':
      const yearStart = new Date(today.getFullYear(), 0, 1)
      return {
        from: yearStart.toISOString().split('T')[0],
        to,
      }

    case '1y':
      const yearAgo = new Date(today)
      yearAgo.setFullYear(today.getFullYear() - 1)
      return {
        from: yearAgo.toISOString().split('T')[0],
        to,
      }

    case '3y':
      const threeYearsAgo = new Date(today)
      threeYearsAgo.setFullYear(today.getFullYear() - 3)
      return {
        from: threeYearsAgo.toISOString().split('T')[0],
        to,
      }

    case '5y':
      const fiveYearsAgo = new Date(today)
      fiveYearsAgo.setFullYear(today.getFullYear() - 5)
      return {
        from: fiveYearsAgo.toISOString().split('T')[0],
        to,
      }

    case 'max':
    default:
      // For max, don't specify from date to get all available data
      return { to }
  }
}
