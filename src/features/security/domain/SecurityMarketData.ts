import { SecurityChange } from './SecurityChange'
import { SecurityVolume } from './SecurityVolume'

export interface SecurityMarketData {
  price: number
  beta: number
  marketCap: number
  lastDividend: number
  range: string
  change: SecurityChange
  isActivelyTrading: boolean
  volume: SecurityVolume
}
