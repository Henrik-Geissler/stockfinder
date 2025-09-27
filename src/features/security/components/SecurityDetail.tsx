import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { SecurityHeader } from './SecurityHeader'

import { SecurityChart } from './SecurityChart'
import { useSecurityProfile } from '../hooks/useSecurityProfile'
import { SecurityInformation } from './SecurityInformation'

export function SecurityDetail() {
  const { symbol = '' } = useParams<{ symbol: string }>()

  const { data: profile, isLoading, error } = useSecurityProfile(symbol)

  return (
    <Box sx={{ p: 3 }}>
      <SecurityHeader symbol={symbol} profile={profile} />
      <SecurityChart symbol={symbol} />
      <SecurityInformation
        symbol={symbol}
        profile={profile}
        isLoading={isLoading}
        error={error}
      />
    </Box>
  )
}
