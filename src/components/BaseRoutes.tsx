import { Routes, Route } from 'react-router-dom'
import { SecurityDetail } from '../features/security/components/SecurityDetail'
import LandingPage from '../features/landing-page/components/LandingPage'
import { SearchPage } from '../features/search/components/SearchPage'

export default function BaseRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/securities/:symbol" element={<SecurityDetail />} />
    </Routes>
  )
}
