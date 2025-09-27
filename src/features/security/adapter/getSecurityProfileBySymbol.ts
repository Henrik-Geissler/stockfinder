import { getProfile } from '../../../api/generated/profile/getProfile'
import { ProfileResponseDTOtoSecurityProfile } from './toDomain/ProfileResponseDTOtoSecurityProfile'
import { SecurityProfile } from '../domain/SecurityProfile'

// Search for securities by query (name or symbol)
export async function getSecurityProfileBySymbol(
  symbol: string
): Promise<SecurityProfile> {
  const data = await getProfile(symbol)

  if (!data?.length) {
    throw new Error(`No profile data found for symbol: ${symbol}`)
  }
  // FMP API returns multiple profiles for the same symbol from different exchanges
  // For now we will use the first one
  return ProfileResponseDTOtoSecurityProfile(data[0])
}
