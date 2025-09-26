import handler from '../api/fmp/[...path]'
import { VercelRequest, VercelResponse } from '@vercel/node'

// Mock VercelRequest and VercelResponse
let mockReq: Partial<VercelRequest>
let mockRes: Partial<VercelResponse>
let mockJson: jest.Mock
let mockStatus: jest.Mock
let mockConsoleError: jest.Mock

describe('API FMP Serverless Function', () => {
  beforeEach(() => {
    mockJson = jest.fn()
    mockStatus = jest.fn(() => ({ json: mockJson }))
    mockRes = {
      status: mockStatus,
      json: mockJson,
    }
    mockConsoleError = jest.fn()
    global.console.error = mockConsoleError
    if (global.fetch && typeof (global.fetch as jest.Mock).mockClear === 'function') {
      (global.fetch as jest.Mock).mockClear()
    }
    mockJson.mockClear()
    mockStatus.mockClear()
  })

  describe('URL Construction', () => {
    it('should handle URL with query parameters', async () => {
      mockReq = {
        method: 'GET',
        url: '/api/fmp/search-name?query=apl&limit=8'
      }

      // Mock successful API response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ symbol: 'AAPL', name: 'Apple Inc.' }])
      })

      await handler(mockReq as VercelRequest, mockRes as VercelResponse)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://financialmodelingprep.com/stable/search-name?query=apl&limit=8&apikey=test-api-key'
      )
    })

    it('should handle URL without query parameters', async () => {
      mockReq = {
        method: 'GET',
        url: '/api/fmp/noqueryparams'
      }

      // Mock successful API response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ symbol: 'AAPL', name: 'Apple Inc.' }])
      })

      await handler(mockReq as VercelRequest, mockRes as VercelResponse)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://financialmodelingprep.com/stable/noqueryparams?apikey=test-api-key'
      )
    })

    it('should handle nested paths', async () => {
      mockReq = {
        method: 'GET',
        url: '/api/fmp/profile/AAPL'
      }

      // Mock successful API response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ symbol: 'AAPL', name: 'Apple Inc.' }])
      })

      await handler(mockReq as VercelRequest, mockRes as VercelResponse)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://financialmodelingprep.com/stable/profile/AAPL?apikey=test-api-key'
      )
    })

    it('should handle deeply nested paths with query parameters', async () => {
      mockReq = {
        method: 'GET',
        url: '/api/fmp/historical-price-eod/light?symbol=MSFT&from=2024-09-26&to=2025-09-26'
      }

      // Mock successful API response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ symbol: 'MSFT', price: 100 }])
      })

      await handler(mockReq as VercelRequest, mockRes as VercelResponse)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=MSFT&from=2024-09-26&to=2025-09-26&apikey=test-api-key'
      )
    })
  })

  describe('Error Handling', () => {
    it('should return 405 for non-GET requests', async () => {
      mockReq = { method: 'POST' }
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(405)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Method not allowed' })
    })

    it('should return 500 when API key is not configured', async () => {
      process.env.VITE_FMP_API_KEY = '' // Unset API key for this test
      mockReq = { method: 'GET', url: '/api/fmp/profile/AAPL' }
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'API key not configured' })
      process.env.VITE_FMP_API_KEY = 'test-api-key' // Reset API key
    })

    it('should return 500 when base URL is not configured', async () => {
      process.env.VITE_FMP_BASE_URL = '' // Unset base URL for this test
      mockReq = { method: 'GET', url: '/api/fmp/profile/AAPL' }
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Base URL not configured' })
      process.env.VITE_FMP_BASE_URL = 'https://financialmodelingprep.com/stable' // Reset base URL
    })

    it('should handle API errors correctly', async () => {
      mockReq = { method: 'GET', url: '/api/fmp/profile/AAPL' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(404)
      expect(mockJson).toHaveBeenCalledWith({
        error: expect.stringContaining('API request failed: 404 Not Found'),
      })
    })

    it('should handle Financial Modeling Prep error messages', async () => {
      mockReq = { method: 'GET', url: '/api/fmp/profile/AAPL' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ 'Error Message': 'Invalid symbol' }),
      })
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid symbol' })
    })

    it('should handle empty results', async () => {
      mockReq = { method: 'GET', url: '/api/fmp/profile/AAPL' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      })
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(404)
      expect(mockJson).toHaveBeenCalledWith({ error: 'No data returned from the API' })
    })
  })

  describe('Successful Responses', () => {
    it('should return successful response with data', async () => {
      mockReq = { method: 'GET', url: '/api/fmp/profile/AAPL' }
      const mockData = [{ symbol: 'AAPL', name: 'Apple Inc.' }]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
      await handler(mockReq as VercelRequest, mockRes as VercelResponse)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(mockData)
    })
  })
})