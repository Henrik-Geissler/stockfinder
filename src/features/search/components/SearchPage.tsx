import { Box, Container, Typography, CircularProgress } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { SearchResultItem } from './SearchResultItem'
import { useSecuritiesByName } from '../hooks/useSecuritiesByName'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const {
    data: results,
    isLoading,
    error,
    isFetching,
  } = useSecuritiesByName(query, 20)

  if (!query) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Search Securities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter a search term to find securities
          </Typography>
        </Box>
      </Container>
    )
  }

  // Show loading screen only if we have no previous data
  if (isLoading && !results) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Searching for "{query}"...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we fetch the results
          </Typography>
        </Box>
      </Container>
    )
  }

  // Show no results if we have an error and no previous data
  if (error && !results) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            No Results Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            No securities found for "{query}"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try a different search term
          </Typography>
        </Box>
      </Container>
    )
  }

  // Show no results only if we have no previous data and no current data
  if (!isLoading && !error && !results) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            No Results Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            No securities found for "{query}"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try a different search term
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found {results?.length || 0} result(s)
          {isFetching && (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                ml: 1,
                gap: 1,
              }}
            >
              <CircularProgress size={16} />
              Loading...
            </Box>
          )}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {results?.map(result => (
          <SearchResultItem key={result.symbol} result={result} />
        ))}
      </Box>
    </Container>
  )
}
