import { Box, Container, Typography, Button, Alert } from '@mui/material'
import { Error as ErrorIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'

interface ErrorProps {
  title?: string
  message: string
  details?: string
  showBackButton?: boolean
  backTo?: string
  backLabel?: string
}

export default function Error({
  title = 'Error',
  message,
  details,
  showBackButton = true,
  backTo = '/',
  backLabel = '← Back to Home',
}: ErrorProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', py: 4, maxWidth: 500, mx: 'auto' }}>
        <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 3 }} />

        <Typography variant="h4" color="error.main" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" color="text.primary" paragraph>
          {message}
        </Typography>

        {details && (
          <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontFamily: 'monospace', mb: 0 }}
            >
              <strong>Details:</strong> {details}
            </Typography>
          </Alert>
        )}

        {showBackButton && (
          <Button
            component={Link}
            to={backTo}
            variant="outlined"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            {backLabel}
          </Button>
        )}
      </Box>
    </Container>
  )
}
