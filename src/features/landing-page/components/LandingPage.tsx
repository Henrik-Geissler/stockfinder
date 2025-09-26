import { Container, Typography } from '@mui/material'

export default function LandingPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Welcome to Stock Finder
      </Typography>
      <Typography variant="body1">Ready to find your next stock?</Typography>
    </Container>
  )
}
