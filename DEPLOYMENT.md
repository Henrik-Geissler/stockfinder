# Deployment Guide

## Vercel Deployment

This application uses serverless functions to proxy API requests securely in production.

### Environment Variables

Add these environment variables in your Vercel dashboard:

- `VITE_FMP_API_KEY` - Your Financial Modeling Prep API key
- `VITE_FMP_BASE_URL` - Financial Modeling Prep base URL (default: https://financialmodelingprep.com/stable)

### How It Works

- **Development**: Vite proxy (`vite.config.ts`) handles API requests and adds the API key server-side
- **Production**: Vercel automatically detects and runs the serverless function (`api/fmp/[...path].ts`) for API requests

### SPA Routing

The application is configured as a Single Page Application (SPA) with the following routing rules:

- **API Routes**: `/api/*` → Handled by serverless functions
- **All Other Routes**: `/*` → Served by `index.html` (enables deep linking)

This means:
- ✅ Direct URLs like `/search/AAPL` will work
- ✅ Browser refresh on any route will work
- ✅ Deep linking to specific pages works
- ✅ API calls are properly routed to serverless functions

### API Security

The API key is never exposed to the frontend. All requests go through:
1. Frontend makes request to `/api/fmp/endpoint`
2. Server (Vite proxy or Vercel function) adds API key and forwards to Financial Modeling Prep
3. Response is returned to frontend

This ensures the API key remains secure and hidden from users.
