import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { SearchBar } from '../features/search/components/SearchBar'

export function Header() {
  const theme = useTheme()

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.custom.colors.surface,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.custom.colors.border}`,
      }}
    >
      <Toolbar sx={{ px: 0 }}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            px: 3, // Match paper padding (24px)
            // Logo aligns with the left edge of the security icon
            // Search bar aligns with the right edge of chart content
          }}
        >
          <Typography
            component={Link}
            to="/"
            variant="h4"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 'bold',
              flexGrow: 0,
            }}
          >
            Stock Finder
          </Typography>

          <Box sx={{ maxWidth: 400, width: '100%', ml: 'auto' }}>
            <SearchBar placeholder="Search by name..." />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
