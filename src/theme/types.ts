import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      colors: {
        surface: string
        surfaceElevated: string
        surfaceOverlay: string
        border: string
        borderStrong: string
        textMuted: string
        shadow: string
        shadowStrong: string
        tooltip: string
      }
      spacing: {
        section: number
        card: number
      }
    }
  }

  interface ThemeOptions {
    custom?: {
      colors?: {
        surface?: string
        surfaceElevated?: string
        surfaceOverlay?: string
        border?: string
        borderStrong?: string
        textMuted?: string
        shadow?: string
        shadowStrong?: string
        tooltip?: string
      }
      spacing?: {
        section?: number
        card?: number
      }
    }
  }
}
