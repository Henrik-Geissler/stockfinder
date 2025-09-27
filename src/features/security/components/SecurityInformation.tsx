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
import { SecurityProfile } from '../domain/SecurityProfile'
import Error from '../../../components/Error'
import { DataPoint } from '../../../components/DataPoint'
interface SecurityInformationProps {
  profile?: SecurityProfile
  isLoading?: boolean
  error?: Error | null
  symbol: string
}

export function SecurityInformation({
  profile,
  isLoading,
  error,
  symbol,
}: SecurityInformationProps) {
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
            <DataPoint label="Market Cap">
              ${profile.marketData.marketCap?.toLocaleString() || 'N/A'}
            </DataPoint>
            <DataPoint label="Beta">
              {profile.marketData.beta?.toFixed(2) || 'N/A'}
            </DataPoint>
            <DataPoint label="Volume">
              {profile.marketData.volume.current?.toLocaleString() || 'N/A'}
            </DataPoint>
            <DataPoint label="Volume (Avg)">
              {profile.marketData.volume.average?.toLocaleString() || 'N/A'}
            </DataPoint>
            <DataPoint label="Last Dividend">
              ${profile.marketData.lastDividend?.toFixed(2) || 'N/A'}
            </DataPoint>
            <DataPoint label="Type">
              {profile.isEtf
                ? 'ETF'
                : profile.isFund
                  ? 'Fund'
                  : profile.isAdr
                    ? 'ADR'
                    : 'Stock'}
            </DataPoint>
          </Box>
        </Paper>

        {/* Company Information */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom color="primary.main">
            Company Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <DataPoint label="ISIN">
              <ReactCountryFlag
                countryCode={profile.companyDetails.companyContactData.country}
                svg
                style={{
                  width: '20px',
                  height: '15px',
                  borderRadius: '2px',
                }}
              />{' '}
              {' ' + (profile.isin || 'N/A')}
            </DataPoint>
            <DataPoint label="CUSIP">{profile.cusip || 'N/A'}</DataPoint>
            <DataPoint label="Industry">
              {profile.companyDetails.industry || 'N/A'}
            </DataPoint>
            <DataPoint label="IPO Date">
              {profile.companyDetails.ipoDate
                ? new Date(profile.companyDetails.ipoDate).toLocaleDateString()
                : 'N/A'}
            </DataPoint>
            <DataPoint label="CEO">
              {profile.companyDetails.ceo || 'N/A'}
            </DataPoint>
            <DataPoint label="Employees">
              {profile.companyDetails.fullTimeEmployees || 'N/A'}
            </DataPoint>
          </Box>
        </Paper>
      </Box>

      {/* Description */}
      {profile.companyDetails.description && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h5" gutterBottom color="primary.main">
            Company Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.6, textAlign: 'justify' }}
          >
            {profile.companyDetails.description}
          </Typography>
        </Paper>
      )}
      {/* Contact Information */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom color="primary.main">
          Contact Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <DataPoint label="Website">
            {profile.companyDetails.companyContactData.website ? (
              <MuiLink
                href={profile.companyDetails.companyContactData.website}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                {profile.companyDetails.companyContactData.website}
              </MuiLink>
            ) : (
              'N/A'
            )}
          </DataPoint>
          <DataPoint label="Phone">
            {profile.companyDetails.companyContactData.phone || 'N/A'}
          </DataPoint>
          <DataPoint label="Address">
            {profile.companyDetails.companyContactData.address
              ? `${profile.companyDetails.companyContactData.address}, ${profile.companyDetails.companyContactData.city}, ${profile.companyDetails.companyContactData.state} ${profile.companyDetails.companyContactData.zip}`
              : 'N/A'}
          </DataPoint>
        </Box>
      </Paper>
    </Paper>
  )
}
