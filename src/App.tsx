import { Box } from '@mui/material'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import BaseRoutes from './components/BaseRoutes'

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <BaseRoutes />
      </Box>
      <Footer />
    </Box>
  )
}
