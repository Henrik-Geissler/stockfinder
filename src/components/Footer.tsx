import {
  Box,
  Typography,
  Divider,
  useTheme,
  Link as MuiLink,
} from '@mui/material'

export function Footer() {
  const theme = useTheme()

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 3,
        background: theme.custom.colors.surfaceOverlay,
        borderTop: `1px solid ${theme.custom.colors.border}`,
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <MuiLink
          href="https://github.com/Henrik-Geissler/stockfinder"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <Typography variant="body2">View on GitHub</Typography>
        </MuiLink>
        <Typography variant="body2" color="text.secondary">
          Version: {import.meta.env.VITE_APP_VERSION} | Environment:{' '}
          {import.meta.env.VITE_APP_ENVIRONMENT || 'development'}
        </Typography>
      </Box>
    </Box>
  )
}
