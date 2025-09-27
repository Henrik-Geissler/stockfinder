import { getHistoricalPriceEodLight } from '../../../api/generated/historical-price-eod/light/getHistoricalPriceEodLight'
import { HistoricalPriceEodResponseDTOtoHistoricalPriceEod } from './toDomain/HistoricalPriceEodResponseDTOtoHistoricalPriceEod'
import { HistoricalPriceEod } from '../domain/HistoricalPriceEod'
import { getDateRangeForPeriod } from './utils/getDateRangeForPeriod'

// Get historical end-of-day price data for a symbol
export async function getHistoricalEodBySymbol(
  symbol: string,
  selectedPeriod: string
): Promise<HistoricalPriceEod[]> {
  const { from, to } = getDateRangeForPeriod(selectedPeriod)
  const data = await getHistoricalPriceEodLight(symbol, from, to)

  if (!data?.length) {
    throw new Error(`No historical price data found for symbol: ${symbol}`)
  }
  // FMP API returns historical data in reverse chronological order (newest first)
  return data.reverse().map(HistoricalPriceEodResponseDTOtoHistoricalPriceEod)
}
