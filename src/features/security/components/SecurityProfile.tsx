import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Link as MuiLink,
  useTheme,
} from '@mui/material'
import ReactCountryFlag from 'react-country-flag'
import { CompanyProfile } from '../domain/CompanyProfile'
import Error from '../../../components/Error'
interface SecurityProfileProps {
  profile?: CompanyProfile
  isLoading?: boolean
  error?: Error | null
  symbol: string
}

export function SecurityProfile({
  profile,
  isLoading,
  error,
  symbol,
}: SecurityProfileProps) {
  const theme = useTheme()
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Loading security information...
          </Typography>{' '}
          <Typography variant="body1" color="text.secondary">
            Fetching data for symbol: {symbol}
          </Typography>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Error
        title="Error Loading Security"
        message={`Failed to load security information for ${symbol}`}
        details={error.message}
      />
    )
  }

  if (!profile) {
    return (
      <Error
        title="No Data Found"
        message={`No security information found for: ${symbol}`}
        details="Please check the symbol and try again"
      />
    )
  }

  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        background: theme.custom.colors.surface,
        border: `1px solid ${theme.custom.colors.border}`,
        boxShadow: theme.custom.colors.shadow,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {/* Financial Information */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom color="primary.main">
            Financial Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Market Cap:
              </Typography>
              <Typography variant="body2">
                ${profile.marketCap?.toLocaleString() || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Beta:
              </Typography>
              <Typography variant="body2">
                {profile.beta?.toFixed(2) || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Volume:
              </Typography>
              <Typography variant="body2">
                {profile.volume?.toLocaleString() || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Volume (Avg):
              </Typography>
              <Typography variant="body2">
                {profile.averageVolume?.toLocaleString() || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Last Dividend:
              </Typography>
              <Typography variant="body2">
                ${profile.lastDividend?.toFixed(2) || 'N/A'}
              </Typography>
            </Box>{' '}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Type:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: profile.isEtf
                    ? theme.palette.success.main
                    : profile.isFund
                      ? theme.palette.info.main
                      : profile.isAdr
                        ? theme.palette.warning.main
                        : theme.palette.grey[500],
                }}
              >
                {profile.isEtf
                  ? 'ETF'
                  : profile.isFund
                    ? 'Fund'
                    : profile.isAdr
                      ? 'ADR'
                      : 'Stock'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Company Information */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom color="primary.main">
            Company Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                ISIN:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ReactCountryFlag
                  countryCode={profile.country}
                  svg
                  style={{
                    width: '20px',
                    height: '15px',
                    borderRadius: '2px',
                  }}
                />
                <Typography variant="body2">{profile.isin || 'N/A'}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                CUSIP:
              </Typography>
              <Typography variant="body2">{profile.cusip || 'N/A'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Industry:
              </Typography>
              <Typography variant="body2">
                {profile.industry || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                IPO Date:
              </Typography>
              <Typography variant="body2">
                {profile.ipoDate
                  ? new Date(profile.ipoDate).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                CEO:
              </Typography>
              <Typography variant="body2">{profile.ceo || 'N/A'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight="bold">
                Employees:
              </Typography>
              <Typography variant="body2">
                {profile.fullTimeEmployees || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Description */}
      {profile.description && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h5" gutterBottom color="primary.main">
            Company Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.6, textAlign: 'justify' }}
          >
            {profile.description}
          </Typography>
        </Paper>
      )}
      {/* Contact Information */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom color="primary.main">
          Contact Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight="bold">
              Website:
            </Typography>
            {profile.website ? (
              <MuiLink
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                {profile.website}
              </MuiLink>
            ) : (
              <Typography variant="body2">N/A</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight="bold">
              Phone:
            </Typography>
            <Typography variant="body2">{profile.phone || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight="bold">
              Address:
            </Typography>
            <Typography variant="body2">
              {profile.address
                ? `${profile.address}, ${profile.city}, ${profile.state} ${profile.zip}`
                : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Paper>
  )
}
