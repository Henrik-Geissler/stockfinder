import { ProfileResponseDTO } from '../../../../api/generated/profile/types/ProfileResponseDTO'

import { SecurityProfile } from '../../domain/SecurityProfile'

export function ProfileResponseDTOtoSecurityProfile(
  dto: ProfileResponseDTO
): SecurityProfile {
  return {
    security: {
      symbol: dto.symbol,
      name: dto.companyName,
      currency: dto.currency,
      exchange: { name: dto.exchange, fullName: dto.exchangeFullName },
    },
    cik: dto.cik,
    isin: dto.isin,
    cusip: dto.cusip,
    isEtf: dto.isEtf,
    isAdr: dto.isAdr,
    isFund: dto.isFund,
    companyDetails: {
      industry: dto.industry,
      sector: dto.sector,
      description: dto.description,
      ceo: dto.ceo,
      fullTimeEmployees: dto.fullTimeEmployees,
      ipoDate: dto.ipoDate,
      companyContactData: {
        website: dto.website,
        country: dto.country,
        phone: dto.phone,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        zip: dto.zip,
      },
    },
    marketData: {
      price: dto.price,
      beta: dto.beta,
      marketCap: dto.marketCap,
      lastDividend: dto.lastDividend,
      range: dto.range,
      change: {
        absolute: dto.change,
        percentage: dto.changePercentage,
      },
      isActivelyTrading: dto.isActivelyTrading,
      volume: { current: dto.volume, average: dto.averageVolume },
    },
  }
}
