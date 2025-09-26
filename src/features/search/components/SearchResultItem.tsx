import { Box, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import type { SearchResult } from '../domain/SearchResult'
import SecurityIcon from '../../../components/SecurityIcon'

interface SearchResultItemProps {
  result: SearchResult
  onClick?: () => void
}

export function SearchResultItem({ result, onClick }: SearchResultItemProps) {
  const theme = useTheme()

  return (
    <Box
      component={Link}
      to={`/securities/${result.symbol}`}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        textDecoration: 'none',
        color: 'inherit',
        borderBottom: `1px solid ${theme.custom.colors.border}`,
        transition: 'background-color 0.25s',
        '&:last-child': {
          borderBottom: 'none',
        },
        '&:hover': {
          background: theme.custom.colors.surfaceElevated,
        },
      }}
    >
      <SecurityIcon symbol={result.symbol} name={result.name} />
      <Box sx={{ flex: 1, ml: 1.5 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
          {result.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'primary.main', opacity: 0.8 }}
        >
          {result.symbol} • {result.exchange}
        </Typography>
      </Box>
    </Box>
  )
}
