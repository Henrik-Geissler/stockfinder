import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCompanyProfileBySymbol } from '../ressource/securities'
import { Box } from '@mui/material'
import { SecurityHeader } from './SecurityHeader'
import { SecurityProfile } from './SecurityProfile'
import { SecurityChart } from './SecurityChart'

export function SecurityDetail() {
  const { symbol = '' } = useParams<{ symbol: string }>()

  // TanStack Query hook for fetching security data
  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useQuery({
    queryKey: ['securityProfile', symbol],
    queryFn: () => getCompanyProfileBySymbol(symbol),
    enabled: !!symbol, // Only run query if symbol is provided
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  })

  return (
    <Box sx={{ p: 3 }}>
      <SecurityHeader symbol={symbol} profile={profile} />
      <SecurityChart symbol={symbol} />
      <SecurityProfile
        symbol={symbol}
        profile={profile}
        isLoading={isLoadingProfile}
        error={errorProfile}
      />
    </Box>
  )
}
