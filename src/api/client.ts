// General API request handler for Financial Modeling Prep API

const API_BASE_URL = '/api/fmp' // Vite proxy in development, Vercel serverless function in production

// Generic API request helper with enhanced error handling
async function makeRequest<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      // Handle specific HTTP status codes
      if (response.status === 401) {
        throw new Error(
          'Invalid API key. Please check your server configuration.'
        )
      } else if (response.status === 403) {
        throw new Error(
          'API access forbidden. Your account may not have access to this endpoint.'
        )
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else if (response.status === 500) {
        throw new Error(
          'Financial Modeling Prep API server error. Please try again later.'
        )
      } else {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        )
      }
    }

    const data = await response.json()

    // Financial Modeling Prep returns error objects for failed requests
    if (data['Error Message']) {
      throw new Error(data['Error Message'])
    }

    // Check for empty results
    if (Array.isArray(data) && data.length === 0) {
      throw new Error('No data returned from the API')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error occurred while fetching data')
  }
}

// Generic function to make requests with custom error handling
export async function makeRequestWithErrorHandling<T>(
  endpoint: string,
  customErrorMessage?: string
): Promise<T> {
  try {
    return await makeRequest<T>(endpoint)
  } catch (error) {
    if (customErrorMessage && error instanceof Error) {
      throw new Error(`${customErrorMessage}: ${error.message}`)
    }
    throw error
  }
}
