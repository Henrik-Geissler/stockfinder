import { Box, Typography, Chip } from '@mui/material'
import { TrendingUp, TrendingDown, Pause } from '@mui/icons-material'
import { SkeletonText } from '../../../components/SkeletonText'
import { SecurityMarketData } from '../domain/SecurityMarketData'

interface SecurityPriceBadgeProps {
  marketData?: SecurityMarketData
  currency?: string
}

export function SecurityPriceBadge({
  marketData,
  currency = '',
}: SecurityPriceBadgeProps) {
  const change = marketData?.change.absolute ?? 0
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Price and Change*/}
      {marketData?.isActivelyTrading && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <SkeletonText
              variant="h4"
              component="div"
              sx={{ fontWeight: 'bold' }}
              content={`${currency} ${marketData?.price.toFixed(2) ?? ''}`}
            />
            <Typography variant="body2" color="text.secondary">
              Current Price
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isPositive && (
                <TrendingUp sx={{ color: '#22c55e', fontSize: 20 }} />
              )}
              {isNegative && (
                <TrendingDown sx={{ color: '#ef4444', fontSize: 20 }} />
              )}
              {!isPositive && !isNegative && (
                <Pause
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                  style={{ visibility: 'hidden' }}
                />
              )}

              <Typography
                variant="h6"
                sx={{
                  color: isPositive
                    ? '#22c55e'
                    : isNegative
                      ? '#ef4444'
                      : 'text.secondary',
                  fontWeight: 'bold',
                }}
              >
                {isPositive ? '+' : ''}
                {change.toFixed(2)}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: isPositive
                  ? '#22c55e'
                  : isNegative
                    ? '#ef4444'
                    : 'text.secondary',
                fontWeight: 500,
              }}
            >
              {isPositive ? '+' : ''}
              {marketData?.change.percentage.toFixed(2)}%
            </Typography>
          </Box>
        </>
      )}

      {/* Trading Status */}
      <Chip
        label={marketData?.isActivelyTrading ? 'Trading' : 'Exchange Closed'}
        color={marketData?.isActivelyTrading ? 'success' : 'default'}
        variant={marketData?.isActivelyTrading ? 'filled' : 'outlined'}
        size="small"
        sx={{
          fontWeight: 500,
          '&.MuiChip-filled': {
            backgroundColor: '#22c55e',
            color: 'white',
          },
          '&.MuiChip-outlined': {
            borderColor: 'text.secondary',
            color: 'text.secondary',
          },
        }}
      />
    </Box>
  )
}
