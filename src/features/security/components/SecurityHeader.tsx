import { Box, Typography, Paper, useTheme } from '@mui/material'

import SecurityIcon from '../../../components/SecurityIcon'
import { SkeletonText } from '../../../components/SkeletonText'
import { SecurityPriceBadge } from './SecurityPriceBadge'
import { SecurityProfile } from '../domain/SecurityProfile'

interface SecurityHeaderProps {
  profile?: SecurityProfile
  symbol: string
}

export function SecurityHeader({ profile, symbol }: SecurityHeaderProps) {
  const theme = useTheme()

  return (
    <Paper
      sx={{
        p: 3,
        background: theme.custom.colors.surface,
        border: `1px solid ${theme.custom.colors.border}`,
        boxShadow: theme.custom.colors.shadow,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'flex-start', lg: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        {/* Company Info and Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            flex: 1,
          }}
        >
          <SecurityIcon
            symbol={profile?.security.symbol ?? symbol}
            name={profile?.security.name}
            size={80}
          />
          <Box>
            <SkeletonText
              variant="h3"
              gutterBottom
              content={profile?.security.name}
            />

            <Typography variant="h4" color="primary.main" gutterBottom>
              {profile?.security.symbol ?? symbol}
            </Typography>
            <SkeletonText
              variant="body1"
              color="text.secondary"
              content={[
                profile?.security.exchange.name,
                profile?.companyDetails.sector,
                profile?.companyDetails.companyContactData.country,
              ]
                .filter(Boolean)
                .join(' • ')}
            />
          </Box>
        </Box>

        {/* Price Badge */}
        <Box sx={{ flexShrink: 0 }}>
          <SecurityPriceBadge
            marketData={profile?.marketData}
            currency={profile?.security.currency}
          />
        </Box>
      </Box>
    </Paper>
  )
}
