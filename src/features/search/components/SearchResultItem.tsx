import { Box, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import SecurityIcon from '../../../components/SecurityIcon'
import { Security } from '../../../domain/Security'

interface SearchResultItemProps {
  security: Security
  onClick?: () => void
}

export function SearchResultItem({ security, onClick }: SearchResultItemProps) {
  const theme = useTheme()

  return (
    <Box
      component={Link}
      to={`/securities/${security.symbol}`}
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
      <SecurityIcon symbol={security.symbol} name={security.name} />
      <Box sx={{ flex: 1, ml: 1.5 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
          {security.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'primary.main', opacity: 0.8 }}
        >
          {security.symbol} • {security.exchange.name}
        </Typography>
      </Box>
    </Box>
  )
}
