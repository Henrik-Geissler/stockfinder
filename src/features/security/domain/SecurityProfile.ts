import { Security } from '../../../domain/Security'
import { SecurityMarketData } from './SecurityMarketData'
import { SecurityCompany } from './SecurityCompany'

export interface SecurityProfile {
  security: Security
  cik?: string
  isin: string
  cusip: string
  isEtf: boolean
  isAdr: boolean
  isFund: boolean
  companyDetails: SecurityCompany
  marketData: SecurityMarketData
}
