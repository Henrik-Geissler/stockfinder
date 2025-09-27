import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Link as MuiLink,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { SearchResultItem } from './SearchResultItem'
import { useSecuritiesByName } from '../hooks/useSecuritiesByName'

interface SearchDropdownProps {
  query: string
  isOpen: boolean
  onClose: () => void
}

export function SearchDropdown({
  query,
  isOpen,
  onClose,
}: SearchDropdownProps) {
  const theme = useTheme()
  const { data: results, isLoading, isFetching } = useSecuritiesByName(query)

  if (!isOpen || query.length < 2) {
    return null
  }

  const handleResultClick = () => {
    onClose()
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
        mt: 0.5,
      }}
    >
      <Paper
        sx={{
          background: theme.custom.colors.tooltip,
          border: `1px solid ${theme.custom.colors.borderStrong}`,
          borderRadius: 2,
          boxShadow: theme.custom.colors.shadowStrong,
          backdropFilter: 'blur(10px)',
          maxHeight: 400,
          overflow: 'auto',
        }}
      >
        {/* Show loading indicator only if we have no previous data */}
        {isLoading && !results && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              color: 'text.secondary',
            }}
          >
            <CircularProgress size={16} />
            <Typography variant="body2">Searching...</Typography>
          </Box>
        )}
        {/* Show results if we have any (either new or previous) */}
        {results && results.length > 0 && (
          <>
            {results.map(security => (
              <SearchResultItem
                key={security.symbol}
                security={security}
                onClick={handleResultClick}
              />
            ))}

            {/* Show fetching indicator if we're fetching new data */}
            {isFetching && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  color: 'text.secondary',
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2">Updating results...</Typography>
              </Box>
            )}

            <Box
              sx={{
                p: 2,
                textAlign: 'center',
                background: theme.palette.primary.main + '1A', // 10% opacity
                borderTop: `1px solid ${theme.custom.colors.border}`,
              }}
            >
              <MuiLink
                component={Link}
                to={`/search?q=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                View all results for "{query}"
              </MuiLink>
            </Box>
          </>
        )}
        {/* Show no results only if we have no previous data and no current data */}
        {!isLoading && !results?.length && (
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            <Typography variant="body2">
              No results found for "{query}"
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
