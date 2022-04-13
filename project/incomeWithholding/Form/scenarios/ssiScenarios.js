import { isPast, isFuture, isCurrentPortion } from './helpers'

// SSI SCENARIOS
export const showSsiAllYear = (values, index) => values.jobs[index].incomeType === 'ssi'

export const showDateRange = (values, index) => showSsiAllYear(values, index) && values.jobs[index].ssiAllYear === 'no'

export const showSsiMonthlyAmount = (values, index, param) => showSsiAllYear(values, index)
  && (values.jobs[index].ssiAllYear === 'yes' || (showDateRange(values, index) && isCurrentPortion(values, index, param)))

export const showSsiBenefitsYTD = (values, index, param) => showDateRange(values, index) && isPast(values, index, param)

export const showTaxesPaidYTD = (values, index, param) => (showSsiMonthlyAmount(values, index, param) && values.jobs[index].ssiMonthlyAmount !== '')
  || (showDateRange(values, index) && isPast(values, index, param) && showSsiBenefitsYTD(values, index, param)
    && values.jobs[index].ssiBenefitsYTD !== '')

export const showTaxesPaidLastPayPeriod = (values, index, param) => showTaxesPaidYTD(values, index, param) && values.jobs[index].taxesYTD !== ''
  && (values.jobs[index].ssiAllYear === 'yes' || (showDateRange(values, index) && isCurrentPortion(values, index, param)))

export const showSsiMonthlyAmountFuture = (values, index, param) => showDateRange(values, index) && isFuture(values, index, param)
