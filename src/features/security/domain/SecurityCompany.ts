import { SecurityCompanyContact } from './SecurityCompanyContact'

export interface SecurityCompany {
  industry: string
  sector: string
  description: string
  ceo: string
  fullTimeEmployees?: string
  ipoDate: string
  companyContactData: SecurityCompanyContact
}
