import { SearchNameResponseDTO } from '../../../../api/generated/search-name/types/SearchNameResponseDTO'
import { Security } from '../../../../domain/Security'

export function SearchNameResponseDTOtoSecurity(
  dto: SearchNameResponseDTO
): Security {
  return {
    symbol: dto.symbol,
    name: dto.name,
    currency: dto.currency,
    exchange: {
      name: dto.exchange,
      fullName: dto.exchangeFullName,
    },
  }
}
