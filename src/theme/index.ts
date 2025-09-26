import { createTheme } from '@mui/material/styles'
import './types'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#646cff',
      dark: '#535bf2',
    },
    secondary: {
      main: '#646cff',
    },
    background: {
      default: '#242424',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
    // Custom colors for financial data
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    grey: {
      500: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.2rem',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '1.8rem',
    },
  },
  // Custom theme properties
  custom: {
    colors: {
      // Background variations
      surface: 'rgba(255, 255, 255, 0.05)',
      surfaceElevated: 'rgba(255, 255, 255, 0.1)',
      surfaceOverlay: 'rgba(0, 0, 0, 0.2)',

      // Border variations
      border: 'rgba(255, 255, 255, 0.1)',
      borderStrong: 'rgba(255, 255, 255, 0.2)',

      // Text variations
      textMuted: 'rgba(255, 255, 255, 0.7)',

      // Shadow variations
      shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      shadowStrong: '0 4px 12px rgba(0, 0, 0, 0.3)',

      // Tooltip/Modal backgrounds
      tooltip: 'rgba(36, 36, 36, 0.95)',
    },
    spacing: {
      section: 24, // 3 * 8px
      card: 16, // 2 * 8px
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minWidth: '320px',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    // Custom Paper component for consistent styling
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiPaper-elevated': {
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
})
