import { Exchange } from './Exchange'

export interface Security {
  symbol: string
  name: string
  currency: string
  exchange: Exchange
}
