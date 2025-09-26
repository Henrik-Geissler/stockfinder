import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    build: {
      // Enable aggressive minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true, // Remove debugger statements
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          passes: 2, // Run compression twice for better results
        },
        mangle: {
          toplevel: true, // Mangle top-level names
          properties: {
            regex: /^_/ // Mangle properties starting with _
          }
        }
      }, 
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000
    },
    server: {
      // Using Vite proxy to avoid CORS issues
      proxy: {
        '/api/fmp': {
          target: env.VITE_FMP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => { 
            return path.replace(/^\/api\/fmp/, '')
          },
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, _req, _res) => {
              // Add the API key to the request server-side
              const apiKey = env.VITE_FMP_API_KEY
              if (apiKey) {
                const url = new URL(proxyReq.path, env.VITE_FMP_BASE_URL)
                url.searchParams.set('apikey', apiKey)
                proxyReq.path = url.pathname + url.search
              }
            })
          }
        }
      }
    }
  }
})
