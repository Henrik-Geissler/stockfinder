/**
 * Vercel Serverless Function for Financial Modeling Prep API Proxy
 * 
 * This file is named `[...path].ts` using Vercel's catch-all dynamic routing syntax.
 * The `[...path]` notation means this function will handle ALL requests to `/api/fmp/*`
 * where `*` can be any path segment(s).
 * 
 * Examples of requests this function handles:
 * - /api/fmp/profile/AAPL
 * - /api/fmp/quote/AAPL
 * - /api/fmp/historical-price-full/AAPL
 * - /api/fmp/any/nested/path/here
 * 
 * This function executes server-side on Vercel's edge network, adding the API key
 * securely before forwarding requests to Financial Modeling Prep API.
 */

import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Handler called with:', {
    url: req.url,
    method: req.method,
    query: req.query
  })

  try {
 
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const apiKey = process.env.VITE_FMP_API_KEY
  const baseUrl = process.env.VITE_FMP_BASE_URL

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  if (!baseUrl) {
    return res.status(500).json({ error: 'Base URL not configured' })
  }

  // Extract the path from the URL
  // Example: https://annas-test.vercel.app/api/fmp/search-name?query=apl&limit=8
  // We need: search-name
  const url = new URL(req.url || '', 'https://example.com')
  const fullPath = url.pathname // /api/fmp/search-name
  const path = fullPath.replace('/api/fmp', '').replace(/^\//, '') // search-name
  
  // Get query parameters from the original URL
  const queryString = url.search // ?query=apl&limit=8
  
  // Build the target URL
  // baseUrl/search-name?query=apl&limit=8&apikey=API_KEY
  const targetUrl = `${baseUrl}/${path}${queryString}${queryString ? '&' : '?'}apikey=${apiKey}`
  console.log('Path extraction:', {targetUrl,
    fullPath,
    path,
    queryString: url.search
  })
    const response = await fetch(targetUrl)
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `API request failed: ${response.status} ${response.statusText}` 
      })
    }

    const data = await response.json()
    
    // Check for Financial Modeling Prep error responses
    if (data['Error Message']) {
      return res.status(400).json({ error: data['Error Message'] })
    }

    // Check for empty results
    if (Array.isArray(data) && data.length === 0) {
      return res.status(404).json({ error: 'No data returned from the API' })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('API proxy error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}