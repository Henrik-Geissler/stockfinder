import { HistoricalPriceEodResponseDTO } from '../../../../api/generated/historical-price-eod/light/types/HistoricalPriceEodResponseDTO'
import { HistoricalPriceEod } from '../../domain/HistoricalPriceEod'

export function HistoricalPriceEodResponseDTOtoHistoricalPriceEod(
  dto: HistoricalPriceEodResponseDTO
): HistoricalPriceEod {
  return [new Date(dto.date).getTime(), dto.price]
}
