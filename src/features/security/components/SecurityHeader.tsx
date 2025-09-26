import { CompanyProfile } from '../domain/CompanyProfile'
import { Box, Typography, Paper, useTheme } from '@mui/material'

import SecurityIcon from '../../../components/SecurityIcon'
import { SkeletonText } from '../../../components/SkeletonText'
import { SecurityPriceBadge } from './SecurityPriceBadge'

interface SecurityHeaderProps {
  profile?: CompanyProfile
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
            symbol={profile?.symbol ?? symbol}
            name={profile?.companyName}
            size={80}
          />
          <Box>
            <SkeletonText
              variant="h3"
              gutterBottom
              content={profile?.companyName}
            />

            <Typography variant="h4" color="primary.main" gutterBottom>
              {profile?.symbol ?? symbol}
            </Typography>
            <SkeletonText
              variant="body1"
              color="text.secondary"
              content={[profile?.exchange, profile?.sector, profile?.country]
                .filter(Boolean)
                .join(' • ')}
            />
          </Box>
        </Box>

        {/* Price Badge */}
        <Box sx={{ flexShrink: 0 }}>
          <SecurityPriceBadge
            price={profile?.price}
            currency={profile?.currency}
            change={profile?.change}
            changePercent={profile?.changePercentage}
            isTrading={profile?.isActivelyTrading}
          />
        </Box>
      </Box>
    </Paper>
  )
}
