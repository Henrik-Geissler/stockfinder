/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENVIRONMENT: string
  readonly VITE_FMP_API_KEY: string
  readonly VITE_FMP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
